class GeocodingService {
  constructor() {
    this.baseUrl = process.env.NOMINATIM_URL || 'https://nominatim.openstreetmap.org';
    this.userAgent = 'HealthSurveillanceApp/1.0';
  }

  async geocodeAddress(address) {
    try {
      const url = `${this.baseUrl}/search?format=json&q=${encodeURIComponent(address)}&limit=5&addressdetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.map(result => ({
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        display_name: result.display_name,
        address: {
          house_number: result.address?.house_number,
          road: result.address?.road,
          suburb: result.address?.suburb,
          city: result.address?.city || result.address?.town || result.address?.village,
          state: result.address?.state,
          country: result.address?.country,
          postcode: result.address?.postcode
        },
        importance: result.importance,
        type: result.type,
        class: result.class
      }));
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }

  async reverseGeocode(lat, lon) {
    try {
      const url = `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Reverse geocoding failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        display_name: data.display_name,
        address: {
          house_number: data.address?.house_number,
          road: data.address?.road,
          suburb: data.address?.suburb,
          city: data.address?.city || data.address?.town || data.address?.village,
          state: data.address?.state,
          country: data.address?.country,
          postcode: data.address?.postcode
        }
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  }

  async searchNearby(lat, lon, amenity = 'hospital', radius = 5000) {
    try {
      // Calculate bounding box (rough approximation)
      const latOffset = radius / 111320; // meters to degrees
      const lonOffset = radius / (111320 * Math.cos(lat * Math.PI / 180));
      
      const bbox = [
        lon - lonOffset, // left
        lat - latOffset, // bottom
        lon + lonOffset, // right
        lat + latOffset  // top
      ];

      const url = `${this.baseUrl}/search?format=json&amenity=${amenity}&limit=20&bounded=1&viewbox=${bbox.join(',')}&addressdetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Nearby search failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.map(result => ({
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        name: result.display_name,
        amenity: result.amenity,
        type: result.type,
        address: result.address,
        distance: this.calculateDistance(lat, lon, parseFloat(result.lat), parseFloat(result.lon))
      })).sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Nearby search error:', error);
      throw error;
    }
  }

  async searchHealthFacilities(lat, lon, radius = 10000) {
    const facilities = [];
    const amenities = ['hospital', 'clinic', 'pharmacy', 'doctors'];
    
    try {
      for (const amenity of amenities) {
        const results = await this.searchNearby(lat, lon, amenity, radius);
        facilities.push(...results.map(r => ({ ...r, facility_type: amenity })));
      }
      
      // Remove duplicates and sort by distance
      const uniqueFacilities = facilities.filter((facility, index, self) => 
        index === self.findIndex(f => f.lat === facility.lat && f.lon === facility.lon)
      );
      
      return uniqueFacilities.sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Health facilities search error:', error);
      return [];
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }

  formatDistance(meters) {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    } else {
      return `${(meters / 1000).toFixed(1)}km`;
    }
  }
}

module.exports = new GeocodingService();