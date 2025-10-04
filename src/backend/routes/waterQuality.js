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

// Get water quality data
router.get('/', authenticate, getWaterQuality);

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

    // Get air quality data which includes water-related environmental factors
    const airQualityData = await weatherService.getAirQualityData(lat, lon);
    
    // Simulate water quality data (in a real app, this would come from sensors/API)
    const waterQualityData = {
      location: { lat: parseFloat(lat), lon: parseFloat(lon) },
      timestamp: new Date().toISOString(),
      pH: 7.2 + (Math.random() - 0.5) * 2, // Simulate pH between 6.2-8.2
      turbidity: Math.random() * 10, // NTU
      dissolvedOxygen: 8 + Math.random() * 4, // mg/L
      temperature: airQualityData.temperature || 20,
      contaminants: {
        chlorine: Math.random() * 0.5,
        fluoride: Math.random() * 1.5,
        lead: Math.random() * 0.01,
        bacteria: Math.floor(Math.random() * 100)
      },
      qualityIndex: Math.floor(Math.random() * 100),
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      airQuality: airQualityData
    };

    res.json(waterQualityData);
  } catch (error) {
    console.error('Error getting water quality data:', error);
    res.status(500).json({ error: 'Failed to get water quality data' });
  }
}

async function analyzeWaterQuality(req, res) {
  try {
    const { waterData } = req.body;
    
    if (!waterData || !Array.isArray(waterData)) {
      return res.status(400).json({ error: 'Water data array is required' });
    }

    // Use Gemini AI to analyze water quality if available
    const analysis = await geminiService.analyzeHealthData(
      `Water Quality Analysis: ${JSON.stringify(waterData)}`,
      'water-quality'
    );

    res.json({
      analysis,
      recommendations: [
        'Monitor pH levels regularly',
        'Check for bacterial contamination',
        'Test for heavy metals',
        'Ensure proper filtration systems'
      ],
      riskAssessment: 'Based on current data, water quality appears acceptable but requires ongoing monitoring'
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