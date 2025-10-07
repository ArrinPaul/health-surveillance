'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Layers, Navigation, AlertTriangle, Droplets, Heart, Users } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationData {
  id: string;
  type: 'health_report' | 'water_quality' | 'community_report' | 'alert';
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
  data?: any;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  airQuality?: number;
}

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  markers?: LocationData[];
  onMapClick?: (lat: number, lon: number) => void;
  onLocationSelect?: (location: { lat: number; lng: number; address?: string }) => void;
  showWeather?: boolean;
  showHealthData?: boolean;
  className?: string;
  height?: string;
  interactive?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center = [40.7128, -74.0060], // Default to New York City
  zoom = 13,
  markers = [],
  onMapClick,
  onLocationSelect,
  showWeather = false,
  showHealthData = true,
  className = '',
  height = '500px',
  interactive = true
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [layerVisibility, setLayerVisibility] = useState({
    health: true,
    water: true,
    community: true,
    alerts: true
  });

  // Geocoding function using Nominatim (OpenStreetMap)
  const geocodeLocation = useCallback(async (query: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        return {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          address: result.display_name
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }, []);

  // Get weather data from Open-Meteo
  const getWeatherData = useCallback(async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEATHER_API_URL}/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,windspeed_10m`
      );
      const data = await response.json();
      
      if (data.current_weather) {
        setWeatherData({
          temperature: data.current_weather.temperature,
          humidity: data.hourly?.relative_humidity_2m?.[0] || 0,
          windSpeed: data.current_weather.windspeed,
          condition: getWeatherCondition(data.current_weather.weathercode)
        });
      }
    } catch (error) {
      console.error('Weather data error:', error);
    }
  }, []);

  const getWeatherCondition = (code: number): string => {
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    if (code <= 82) return 'Showers';
    return 'Stormy';
  };

  // Custom icons for different marker types
  const createCustomIcon = (type: LocationData['type'] = 'health_report', severity: LocationData['severity'] = 'low') => {
    const iconConfig = {
      health_report: { color: '#10b981', icon: '🏥' },
      water_quality: { color: '#06b6d4', icon: '💧' },
      community_report: { color: '#8b5cf6', icon: '👥' },
      alert: { color: '#ef4444', icon: '⚠️' }
    };

    const severityColors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#7c2d12'
    };

    const config = iconConfig[type];
    const color = severity ? severityColors[severity] : config.color;

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
        ">${config.icon}</div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };

  // Handle search
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    const result = await geocodeLocation(searchQuery);
    if (result && mapInstanceRef.current) {
      mapInstanceRef.current.setView([result.lat, result.lng], 15);
      setSelectedLocation(result);
      
      if (showWeather) {
        await getWeatherData(result.lat, result.lng);
      }
      
      if (onLocationSelect) {
        onLocationSelect(result);
      }
    }
  }, [searchQuery, geocodeLocation, getWeatherData, showWeather, onLocationSelect]);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
        dragging: interactive
      }).setView(center, zoom);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Add click handler
      if (onMapClick || onLocationSelect) {
        mapInstanceRef.current.on('click', async (e) => {
          const { lat, lng } = e.latlng;
          
          if (onMapClick) {
            onMapClick(lat, lng);
          }
          
          if (onLocationSelect) {
            // Reverse geocode to get address
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/reverse?format=json&lat=${lat}&lon=${lng}`
              );
              const data = await response.json();
              const address = data?.display_name;
              
              const location = { lat, lng, address };
              setSelectedLocation(location);
              onLocationSelect(location);
              
              if (showWeather) {
                await getWeatherData(lat, lng);
              }
            } catch (error) {
              console.error('Reverse geocoding error:', error);
              onLocationSelect({ lat, lng });
            }
          }
        });
      }

      // Get current location weather if enabled
      if (showWeather) {
        getWeatherData(center[0], center[1]);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, interactive, onMapClick, onLocationSelect, showWeather, getWeatherData]);

  // Update markers
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current?.removeLayer(layer);
        }
      });

      // Filter markers based on layer visibility
      const filteredMarkers = markers.filter(marker => {
        switch (marker.type) {
          case 'health_report': return layerVisibility.health;
          case 'water_quality': return layerVisibility.water;
          case 'community_report': return layerVisibility.community;
          case 'alert': return layerVisibility.alerts;
          default: return true;
        }
      });

      // Add new markers
      filteredMarkers.forEach((marker) => {
        if (mapInstanceRef.current) {
          const icon = createCustomIcon(marker.type, marker.severity);
          const leafletMarker = L.marker([marker.latitude, marker.longitude], { icon });
          
          const popupContent = `
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${marker.title}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px;">${marker.description}</p>
              ${marker.severity ? `<span style="
                background-color: ${marker.severity === 'critical' ? '#ef4444' : 
                                   marker.severity === 'high' ? '#f59e0b' : 
                                   marker.severity === 'medium' ? '#eab308' : '#10b981'};
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: bold;
              ">${marker.severity.toUpperCase()}</span>` : ''}
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
                ${new Date(marker.timestamp).toLocaleString()}
              </p>
            </div>
          `;
          
          leafletMarker.bindPopup(popupContent);
          leafletMarker.addTo(mapInstanceRef.current);
        }
      });
    }
  }, [markers, layerVisibility]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Health Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Layer Controls */}
          {showHealthData && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={layerVisibility.health ? "default" : "outline"}
                size="sm"
                onClick={() => setLayerVisibility(prev => ({ ...prev, health: !prev.health }))}
                className="flex items-center gap-1"
              >
                <Heart className="h-3 w-3" />
                Health Reports
              </Button>
              <Button
                variant={layerVisibility.water ? "default" : "outline"}
                size="sm"
                onClick={() => setLayerVisibility(prev => ({ ...prev, water: !prev.water }))}
                className="flex items-center gap-1"
              >
                <Droplets className="h-3 w-3" />
                Water Quality
              </Button>
              <Button
                variant={layerVisibility.community ? "default" : "outline"}
                size="sm"
                onClick={() => setLayerVisibility(prev => ({ ...prev, community: !prev.community }))}
                className="flex items-center gap-1"
              >
                <Users className="h-3 w-3" />
                Community
              </Button>
              <Button
                variant={layerVisibility.alerts ? "default" : "outline"}
                size="sm"
                onClick={() => setLayerVisibility(prev => ({ ...prev, alerts: !prev.alerts }))}
                className="flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                Alerts
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weather Info */}
      {showWeather && weatherData && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">{weatherData.temperature}°C</div>
                <div className="text-muted-foreground">Temperature</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{weatherData.humidity}%</div>
                <div className="text-muted-foreground">Humidity</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{weatherData.windSpeed} km/h</div>
                <div className="text-muted-foreground">Wind Speed</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{weatherData.condition}</div>
                <div className="text-muted-foreground">Condition</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Location Info */}
      {selectedLocation && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="font-semibold flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                Selected Location
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</div>
                {selectedLocation.address && (
                  <div className="mt-1">{selectedLocation.address}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full border rounded-lg overflow-hidden"
        style={{ height }}
      />
    </div>
  );
};

export default MapComponent;