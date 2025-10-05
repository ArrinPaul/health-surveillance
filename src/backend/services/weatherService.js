class WeatherService {
  constructor() {
    this.baseUrl = process.env.OPEN_METEO_URL || 'https://api.open-meteo.com/v1';
  }

  async getCurrentWeather(lat, lon) {
    try {
      const url = `${this.baseUrl}/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        weathercode: data.current_weather.weathercode,
        time: data.current_weather.time,
        description: this.interpretWeatherCode(data.current_weather.weathercode)
      };
    } catch (error) {
      console.error('Weather service error:', error);
      throw error;
    }
  }

  async getDetailedWeather(lat, lon, days = 7) {
    try {
      const url = `${this.baseUrl}/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&hourly=temperature_2m,precipitation,relative_humidity_2m&timezone=auto&forecast_days=${days}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Detailed weather API failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        current: {
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone
        },
        daily: {
          time: data.daily.time,
          temperature_max: data.daily.temperature_2m_max,
          temperature_min: data.daily.temperature_2m_min,
          precipitation: data.daily.precipitation_sum,
          windspeed: data.daily.windspeed_10m_max
        },
        hourly: {
          time: data.hourly.time.slice(0, 24), // Next 24 hours
          temperature: data.hourly.temperature_2m.slice(0, 24),
          precipitation: data.hourly.precipitation.slice(0, 24),
          humidity: data.hourly.relative_humidity_2m.slice(0, 24)
        }
      };
    } catch (error) {
      console.error('Detailed weather service error:', error);
      throw error;
    }
  }

  async getAirQuality(lat, lon) {
    try {
      const url = `${this.baseUrl}/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Air quality API failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        pm10: data.current.pm10,
        pm2_5: data.current.pm2_5,
        carbon_monoxide: data.current.carbon_monoxide,
        nitrogen_dioxide: data.current.nitrogen_dioxide,
        sulphur_dioxide: data.current.sulphur_dioxide,
        ozone: data.current.ozone,
        time: data.current.time,
        quality_index: this.calculateAQI(data.current)
      };
    } catch (error) {
      console.error('Air quality service error:', error);
      // Return mock data if service fails
      return {
        pm10: null,
        pm2_5: null,
        carbon_monoxide: null,
        nitrogen_dioxide: null,
        sulphur_dioxide: null,
        ozone: null,
        time: new Date().toISOString(),
        quality_index: 'unavailable'
      };
    }
  }

  interpretWeatherCode(code) {
    const codes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      95: 'Thunderstorm'
    };
    
    return codes[code] || 'Unknown weather condition';
  }

  async getWeatherData(lat, lon) {
    try {
      // Use OpenWeatherMap API if available, otherwise fall back to Open-Meteo
      if (process.env.OPENWEATHER_API_KEY) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
        );
        
        if (response.ok) {
          const data = await response.json();
          return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            rainfall: data.rain ? data.rain['1h'] || 0 : 0,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            description: data.weather[0].description
          };
        }
      }
      
      // Fallback to Open-Meteo (free)
      const currentWeather = await this.getCurrentWeather(lat, lon);
      const detailedWeather = await this.getDetailedWeather(lat, lon, 1);
      
      return {
        temperature: currentWeather.temperature + 273.15, // Convert to Kelvin for compatibility
        humidity: detailedWeather.hourly.humidity[0] || 60,
        rainfall: detailedWeather.hourly.precipitation[0] || 0,
        windSpeed: currentWeather.windspeed,
        description: currentWeather.description
      };
    } catch (error) {
      console.error('Weather data error:', error);
      // Return reasonable defaults if all services fail
      return {
        temperature: 298.15, // 25°C in Kelvin
        humidity: 65,
        rainfall: 0,
        windSpeed: 5,
        description: 'Data unavailable'
      };
    }
  }

  calculateAQI(airData) {
    // Simple AQI calculation based on PM2.5
    if (!airData.pm2_5) return 'unavailable';
    
    const pm25 = airData.pm2_5;
    if (pm25 <= 12) return 'good';
    if (pm25 <= 35.4) return 'moderate';
    if (pm25 <= 55.4) return 'unhealthy_for_sensitive';
    if (pm25 <= 150.4) return 'unhealthy';
    if (pm25 <= 250.4) return 'very_unhealthy';
    return 'hazardous';
  }

  getHealthRisks(weather, airQuality) {
    const risks = [];
    
    // Temperature-based risks
    if (weather.temperature > 35) {
      risks.push('High temperature increases bacterial growth risk in water sources');
    }
    if (weather.temperature < 5) {
      risks.push('Cold weather may affect water treatment processes');
    }
    
    // Precipitation risks
    if (weather.precipitation && weather.precipitation > 10) {
      risks.push('Heavy rainfall may contaminate water sources with runoff');
    }
    
    // Air quality risks
    if (airQuality.quality_index === 'unhealthy' || airQuality.quality_index === 'very_unhealthy') {
      risks.push('Poor air quality may exacerbate respiratory symptoms');
    }
    
    return risks;
  }
}

module.exports = new WeatherService();