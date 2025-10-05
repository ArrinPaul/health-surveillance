'use client';

import React from 'react';
// @ts-ignore - React 19 compatibility issue
const { useEffect, useRef } = React;
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    lat: number;
    lon: number;
    popup?: string;
    color?: 'red' | 'green' | 'blue' | 'yellow';
    type?: 'health' | 'water' | 'alert' | 'default';
  }>;
  onMapClick?: (lat: number, lon: number) => void;
  className?: string;
  height?: string;
}

const MapComponent = ({
  center,
  zoom = 13,
  markers = [],
  onMapClick,
  className = '',
  height = '400px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Custom icons for different marker types
  const createCustomIcon = (type: string = 'default', color: string = 'blue') => {
    const iconColors = {
      red: '#dc2626',
      green: '#16a34a',
      blue: '#2563eb',
      yellow: '#ca8a04'
    };

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${iconColors[color as keyof typeof iconColors] || iconColors.blue};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Add click handler
      if (onMapClick) {
        mapInstanceRef.current.on('click', (e) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current?.removeLayer(layer);
        }
      });

      // Add new markers
      markers.forEach((marker) => {
        if (mapInstanceRef.current) {
          const icon = createCustomIcon(marker.type, marker.color);
          const leafletMarker = L.marker([marker.lat, marker.lon], { icon });
          
          if (marker.popup) {
            leafletMarker.bindPopup(marker.popup);
          }
          
          leafletMarker.addTo(mapInstanceRef.current);
        }
      });
    }
  }, [markers]);

  // Update center
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full rounded-lg border ${className}`}
      style={{ height, minHeight: '300px' }}
    />
  );
};

export default MapComponent;