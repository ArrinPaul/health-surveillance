const axios = require('axios');

// Get water quality data
exports.getWaterQuality = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    // Fetch weather data from OpenWeatherMap API
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_API_KEY,
      },
    });

    const weatherData = weatherResponse.data;

    // Normalize water quality data (mocked for now)
    const waterQualityData = {
      pH: 7.2,
      turbidity: 1.5,
      contaminants: ['Lead', 'Arsenic'],
    };

    // ML-based prediction for water quality
    const contaminationRisk = waterQualityData.pH < 6.5 || waterQualityData.turbidity > 5 ? 'High' : 'Low';
    waterQualityData.riskLevel = contaminationRisk;

    res.status(200).json({
      weather: {
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        rainfall: weatherData.rain ? weatherData.rain['1h'] : 0,
      },
      waterQuality: waterQualityData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch water quality data', error: error.message });
  }
};

/**
 * Analyze water quality and predict contamination risks.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const analyzeWaterQuality = (req, res) => {
  const { waterData } = req.body;

  // Example: Simulate contamination risk prediction
  const analysis = waterData.map((data) => {
    const risk = data.contaminantLevel > 50 ? 'High' : 'Low';
    return {
      location: data.location,
      contaminantLevel: data.contaminantLevel,
      risk,
    };
  });

  res.status(200).json({ analysis });
};

module.exports = { analyzeWaterQuality };