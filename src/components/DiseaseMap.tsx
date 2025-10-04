"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DiseaseMapProps {
  hotspots?: Array<{
    lat: number;
    lng: number;
    cases: number;
    location: string;
  }>;
}

export default function DiseaseMap({ hotspots = [] }: DiseaseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([26.1445, 91.7362], 7); // Guwahati, Assam

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add default hotspots if none provided
    const defaultHotspots = hotspots.length > 0 ? hotspots : [
      { lat: 26.1445, lng: 91.7362, cases: 45, location: 'Guwahati' },
      { lat: 26.2006, lng: 92.9376, cases: 23, location: 'Jorhat' },
      { lat: 26.7509, lng: 94.2037, cases: 12, location: 'Dibrugarh' },
      { lat: 25.5788, lng: 91.8933, cases: 34, location: 'Shillong' },
      { lat: 26.7271, lng: 93.0800, cases: 18, location: 'Tezpur' }
    ];

    // Add markers for hotspots
    defaultHotspots.forEach((hotspot) => {
      const severity = hotspot.cases > 30 ? 'high' : hotspot.cases > 15 ? 'medium' : 'low';
      const color = severity === 'high' ? '#ef4444' : severity === 'medium' ? '#f59e0b' : '#10b981';
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: ${20 + hotspot.cases / 2}px; height: ${20 + hotspot.cases / 2}px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${hotspot.cases}</div>`,
        iconSize: [20 + hotspot.cases / 2, 20 + hotspot.cases / 2],
      });

      L.marker([hotspot.lat, hotspot.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${hotspot.location}</strong><br/>Active Cases: ${hotspot.cases}`);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [hotspots]);

  return <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />;
}