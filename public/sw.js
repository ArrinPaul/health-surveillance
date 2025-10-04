const CACHE_NAME = 'health-surveillance-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/login',
  '/register',
  '/dashboard',
  '/offline.html'
];

// Install service worker and cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy: Network first, fall back to cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response and cache it
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // If not in cache, return offline page
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});

// Background sync for offline data submission
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reports') {
    event.waitUntil(syncReports());
  }
});

async function syncReports() {
  // Get pending reports from IndexedDB
  const db = await openDB();
  const reports = await db.getAll('pending-reports');
  
  // Submit each report
  for (const report of reports) {
    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
      await db.delete('pending-reports', report.id);
    } catch (error) {
      console.error('Failed to sync report:', error);
    }
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('health-surveillance', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending-reports')) {
        db.createObjectStore('pending-reports', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}