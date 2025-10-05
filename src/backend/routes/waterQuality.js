const express = require('express');
const weatherService = require('../services/weatherService');
const geocodingService = require('../services/geocodingService');
const geminiService = require('../services/geminiService');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Water Quality
 *   description: Water quality monitoring
 */

/**
 * @swagger
 * /water-quality:
 *   get:
 *     summary: Get water quality data
 *     tags: [Water Quality]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Water quality data retrieved successfully
 *       400:
 *         description: Validation error
 */

// Get water quality data (remove auth for testing)
router.get('/', getWaterQuality);

/**
 * @swagger
 * /water-quality/analyze:
 *   post:
 *     summary: Analyze water quality and predict contamination risks
 *     tags: [Water Quality]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               waterData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     location:
 *                       type: string
 *                     contaminantLevel:
 *                       type: number
 *     responses:
 *       200:
 *         description: Water quality analysis successful
 *       500:
 *         description: Failed to analyze water quality
 */

// Controller functions
async function getWaterQuality(req, res) {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Get real weather data
    const weatherData = await weatherService.getWeatherData(lat, lon);
    
    // Calculate water quality based on environmental factors
    const baseTemp = weatherData.temperature - 273.15; // Convert K to C
    const humidity = weatherData.humidity;
    const rainfall = weatherData.rainfall || 0;
    
    // Simulate realistic water quality data based on environmental conditions
    const waterQualityData = {
      pH: calculateRealisticpH(baseTemp, rainfall, humidity),
      turbidity: calculateTurbidity(rainfall, humidity),
      dissolvedOxygen: calculateDissolvedOxygen(baseTemp),
      contaminants: ['Lead', 'Arsenic', 'Bacteria'],
      riskLevel: 'Low'
    };
    
    // Determine risk level based on parameters
    if (waterQualityData.pH < 6.5 || waterQualityData.pH > 8.5 || waterQualityData.turbidity > 5) {
      waterQualityData.riskLevel = 'High';
    } else if (waterQualityData.turbidity > 2) {
      waterQualityData.riskLevel = 'Medium';
    }

    res.json({
      weather: {
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        rainfall: weatherData.rainfall || 0
      },
      waterQuality: waterQualityData,
      timestamp: new Date().toISOString(),
      location: { lat: parseFloat(lat), lon: parseFloat(lon) }
    });
  } catch (error) {
    console.error('Error getting water quality data:', error);
    res.status(500).json({ error: 'Failed to get water quality data' });
  }
}

// Helper functions for realistic calculations
function calculateRealisticpH(temperature, rainfall, humidity) {
  let pH = 7.0; // neutral baseline
  
  // Temperature effects
  if (temperature > 30) pH -= 0.3; // heat can increase acidity
  if (temperature < 10) pH += 0.2;
  
  // Rainfall effects (acid rain)
  if (rainfall > 50) pH -= 0.5;
  if (rainfall > 100) pH -= 0.8;
  
  // Add some natural variation
  pH += (Math.random() - 0.5) * 0.4;
  
  return Math.max(5.5, Math.min(9.0, parseFloat(pH.toFixed(1))));
}

function calculateTurbidity(rainfall, humidity) {
  let turbidity = 1.0; // baseline
  
  // High rainfall increases turbidity
  if (rainfall > 20) turbidity += rainfall * 0.05;
  if (rainfall > 100) turbidity += rainfall * 0.1;
  
  // Humidity effects
  if (humidity > 80) turbidity += 0.5;
  
  // Natural variation
  turbidity += Math.random() * 2;
  
  return Math.max(0.1, parseFloat(turbidity.toFixed(1)));
}

function calculateDissolvedOxygen(temperature) {
  // Higher temperature = lower dissolved oxygen
  let oxygen = 14 - (temperature * 0.2);
  oxygen += (Math.random() - 0.5) * 2;
  return Math.max(4, Math.min(12, parseFloat(oxygen.toFixed(1))));
}

async function analyzeWaterQuality(req, res) {
  try {
    const { location, coordinates, waterQuality, weather } = req.body;
    
    if (!waterQuality) {
      return res.status(400).json({ error: 'Water quality data is required' });
    }

    // Prepare data for AI analysis
    const analysisPrompt = `
    Analyze this water quality data for ${location}:
    
    Location: ${location} (${coordinates.lat}, ${coordinates.lng})
    pH Level: ${waterQuality.pH}
    Turbidity: ${waterQuality.turbidity} NTU
    Temperature: ${weather.temperature - 273.15}°C
    Humidity: ${weather.humidity}%
    Rainfall: ${weather.rainfall || 0}mm
    Risk Level: ${waterQuality.riskLevel}
    
    Provide specific recommendations for water safety and health protection.
    `;

    // Use Gemini AI to analyze water quality if available
    const aiAnalysis = await geminiService.analyzeHealthData(analysisPrompt, 'water-quality');

    // Generate smart recommendations based on the data
    let recommendations = [];
    
    if (waterQuality.pH < 6.5) {
      recommendations.push('⚠️ pH level is too acidic - consider lime treatment');
    } else if (waterQuality.pH > 8.5) {
      recommendations.push('⚠️ pH level is too alkaline - may cause skin irritation');
    }
    
    if (waterQuality.turbidity > 5) {
      recommendations.push('⚠️ High turbidity detected - filtration recommended');
    }
    
    if (waterQuality.turbidity > 10) {
      recommendations.push('🚫 Very high turbidity - avoid consumption without treatment');
    }
    
    if (weather.rainfall > 50) {
      recommendations.push('🌧️ High rainfall may affect water quality - increase monitoring');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Water quality parameters appear normal');
      recommendations.push('Continue regular monitoring and testing');
    }
    
    // Add AI-generated insights if available
    if (aiAnalysis && !aiAnalysis.includes('not available')) {
      recommendations.push(`🤖 AI Insight: ${aiAnalysis}`);
    }

    res.json({
      analysis: aiAnalysis,
      recommendations,
      riskAssessment: waterQuality.riskLevel === 'High' ? 
        'High risk detected - immediate action recommended' :
        waterQuality.riskLevel === 'Medium' ? 
        'Moderate risk - monitor closely' : 
        'Low risk - continue normal monitoring',
      aiPowered: !aiAnalysis.includes('not available')
    });
  } catch (error) {
    console.error('Error analyzing water quality:', error);
    res.status(500).json({ error: 'Failed to analyze water quality' });
  }
}

// Analyze water quality
router.post('/analyze', analyzeWaterQuality);

module.exports = router;
module.exports = router;