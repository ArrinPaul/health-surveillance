import type { Metadata, Viewport } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import ClientProviders from "@/components/ClientProviders";

console.log("Layout component loaded");

export const metadata: Metadata = {
  title: "Smart Health Surveillance System",
  description: "Early Warning System for Health Officials and Community - Disease Monitoring and Water Quality Tracking",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Health Surveillance",
  },
  openGraph: {
    title: "Smart Health Surveillance System",
    description: "Early Warning System for Disease Monitoring and Water Quality Tracking",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: any;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        {/* Disable service worker in development */}
        <Script id="disable-service-worker" strategy="afterInteractive">
          {`
            if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
              const isProduction = ${process.env.NODE_ENV === 'production'};
              if (isProduction) {
                navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed', err));
              } else {
                // Unregister service worker in development
                navigator.serviceWorker.getRegistrations().then(registrations => {
                  registrations.forEach(registration => registration.unregister());
                });
              }
            }
          `}
        </Script>
        <Script id="suppress-resize-observer" strategy="beforeInteractive">
          {`
            // Suppress benign ResizeObserver error (common with Radix UI/shadcn)
            (function() {
              const resizeObserverErrHandler = function(e) {
                if (e.message && e.message.includes('ResizeObserver loop')) {
                  const resizeObserverErr = 'ResizeObserver loop completed with undelivered notifications.';
                  if (e.message === resizeObserverErr || e.message.includes('ResizeObserver')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                  }
                }
              };
              
              if (typeof window !== 'undefined') {
                window.addEventListener('error', resizeObserverErrHandler);
                
                const originalOnError = window.onerror;
                window.onerror = function(message, source, lineno, colno, error) {
                  if (message && typeof message === 'string' && message.includes('ResizeObserver')) {
                    return true;
                  }
                  if (originalOnError) {
                    return originalOnError(message, source, lineno, colno, error);
                  }
                  return false;
                };
              }
            })();
          `}
        </Script>
        {/* Service Worker temporarily disabled to fix offline detection issues */}
        {/*<Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(reg => console.log('Service Worker registered'))
                  .catch(err => console.log('Service Worker registration failed', err));
              });
            }
          `}
        </Script>*/}
        <ClientProviders>
          {children}
        </ClientProviders>
        {/* Disable VisualEditsMessenger in production to prevent crashes */}
        {process.env.NODE_ENV === 'development' && <VisualEditsMessenger />}
      </body>
    </html>
  );
}