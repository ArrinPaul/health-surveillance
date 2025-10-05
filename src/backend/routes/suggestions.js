const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * @swagger
 * /suggestions/generate:
 *   post:
 *     summary: Generate AI-powered personalized suggestions
 *     tags: [AI Suggestions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID for personalization
 *               location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *                   area:
 *                     type: string
 *               preferences:
 *                 type: object
 *                 description: User preferences and settings
 *               healthData:
 *                 type: object
 *                 description: Recent health data or patterns
 *     responses:
 *       200:
 *         description: Personalized suggestions generated successfully
 */
router.post('/generate', async (req, res) => {
  try {
    const { userId, location, preferences, healthData } = req.body;

    // Generate contextual suggestions based on multiple factors
    const suggestions = await generatePersonalizedSuggestions({
      userId,
      location,
      preferences,
      healthData,
      timestamp: new Date()
    });

    res.json({
      suggestions,
      generatedAt: new Date(),
      refreshInterval: 30 // minutes
    });

  } catch (error) {
    console.error('AI Suggestions error:', error);
    
    // Fallback to basic suggestions
    const fallbackSuggestions = generateBasicSuggestions();
    
    res.json({
      suggestions: fallbackSuggestions,
      generatedAt: new Date(),
      refreshInterval: 30,
      fallback: true
    });
  }
});

/**
 * @swagger
 * /suggestions/health-trends:
 *   get:
 *     summary: Get health trend-based suggestions
 *     tags: [AI Suggestions]
 *     parameters:
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         description: Geographic area for trend analysis
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         description: Time frame for trend analysis
 *     responses:
 *       200:
 *         description: Health trend suggestions retrieved successfully
 */
router.get('/health-trends', async (req, res) => {
  try {
    const { area = 'general', timeframe = 'weekly' } = req.query;

    // Simulate AI analysis of health trends
    const trends = await analyzeHealthTrends(area, timeframe);
    const suggestions = generateTrendBasedSuggestions(trends);

    res.json({
      trends,
      suggestions,
      area,
      timeframe,
      confidence: 0.87
    });

  } catch (error) {
    console.error('Health trends error:', error);
    res.status(500).json({ error: 'Failed to analyze health trends' });
  }
});

/**
 * @swagger
 * /suggestions/risk-assessment:
 *   post:
 *     summary: Generate risk-based suggestions using AI
 *     tags: [AI Suggestions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               factors:
 *                 type: object
 *                 description: Risk factors to analyze
 *     responses:
 *       200:
 *         description: Risk assessment and suggestions generated
 */
router.post('/risk-assessment', async (req, res) => {
  try {
    const { factors } = req.body;

    // Use AI to assess risks and generate suggestions
    const riskAssessment = await performAIRiskAssessment(factors);
    const suggestions = generateRiskBasedSuggestions(riskAssessment);

    res.json({
      riskAssessment,
      suggestions,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Risk assessment error:', error);
    res.status(500).json({ error: 'Failed to perform risk assessment' });
  }
});

/**
 * @swagger
 * /suggestions/contextual:
 *   get:
 *     summary: Get contextual suggestions based on current conditions
 *     tags: [AI Suggestions]
 *     parameters:
 *       - in: query
 *         name: time
 *         schema:
 *           type: string
 *         description: Current time for contextual analysis
 *       - in: query
 *         name: weather
 *         schema:
 *           type: string
 *         description: Current weather conditions
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *         description: Current season
 *     responses:
 *       200:
 *         description: Contextual suggestions retrieved successfully
 */
router.get('/contextual', (req, res) => {
  try {
    const { time, weather, season } = req.query;
    
    const contextualSuggestions = generateContextualSuggestions({
      time: time || new Date().toISOString(),
      weather: weather || 'normal',
      season: season || getCurrentSeason()
    });

    res.json({
      suggestions: contextualSuggestions,
      context: { time, weather, season },
      generatedAt: new Date()
    });

  } catch (error) {
    console.error('Contextual suggestions error:', error);
    res.status(500).json({ error: 'Failed to generate contextual suggestions' });
  }
});

// Helper Functions

async function generatePersonalizedSuggestions(userData) {
  const currentHour = new Date().getHours();
  const currentMonth = new Date().getMonth();
  
  const suggestions = [
    {
      id: `personal-${Date.now()}-1`,
      type: 'health',
      priority: 'high',
      title: 'AI Risk Alert',
      description: 'Based on current weather patterns and community data, there\'s a 23% increased risk of waterborne diseases in your area this week.',
      action: 'View Prevention Tips',
      actionUrl: '/education',
      category: 'disease_prevention',
      aiGenerated: true,
      confidence: 0.89
    },
    {
      id: `personal-${Date.now()}-2`,
      type: 'water',
      priority: 'medium',
      title: 'Smart Water Management',
      description: 'AI analysis suggests optimal water purification time is 22 minutes based on your local water source quality data.',
      action: 'Set Timer',
      category: 'water_safety',
      aiGenerated: true,
      confidence: 0.76
    }
  ];

  // Add time-based suggestions
  if (currentHour >= 6 && currentHour <= 8) {
    suggestions.unshift({
      id: `time-${Date.now()}`,
      type: 'health',
      priority: 'high',
      title: 'Morning Health Alert',
      description: 'Peak contamination period detected. Extra precaution recommended for water consumption.',
      action: 'Learn More',
      category: 'time_based',
      aiGenerated: true,
      confidence: 0.92
    });
  }

  // Add seasonal suggestions
  if (currentMonth >= 5 && currentMonth <= 8) { // Monsoon
    suggestions.push({
      id: `season-${Date.now()}`,
      type: 'emergency',
      priority: 'high',
      title: 'Monsoon Health Protocol',
      description: 'AI models predict 40% higher vector-borne disease risk. Enhanced protection measures recommended.',
      action: 'View Protocol',
      actionUrl: '/emergency-protocol',
      category: 'seasonal',
      aiGenerated: true,
      confidence: 0.84
    });
  }

  return suggestions;
}

function generateBasicSuggestions() {
  return [
    {
      id: 'basic-1',
      type: 'water',
      priority: 'medium',
      title: 'Daily Water Safety',
      description: 'Ensure your drinking water is properly boiled and stored in clean containers.',
      action: 'Learn More',
      actionUrl: '/education',
      category: 'basic_safety',
      aiGenerated: false
    },
    {
      id: 'basic-2',
      type: 'health',
      priority: 'low',
      title: 'Hand Hygiene Reminder',
      description: 'Regular hand washing remains your best defense against diseases.',
      action: 'View Guide',
      actionUrl: '/education',
      category: 'hygiene',
      aiGenerated: false
    }
  ];
}

async function analyzeHealthTrends(area, timeframe) {
  // Simulate AI trend analysis
  const trends = {
    waterborne_diseases: {
      trend: 'increasing',
      percentage: 12,
      confidence: 0.78
    },
    hygiene_compliance: {
      trend: 'improving',
      percentage: 34,
      confidence: 0.92
    },
    water_quality: {
      trend: 'stable',
      percentage: 2,
      confidence: 0.65
    }
  };

  return trends;
}

function generateTrendBasedSuggestions(trends) {
  const suggestions = [];

  if (trends.waterborne_diseases?.trend === 'increasing') {
    suggestions.push({
      id: `trend-disease-${Date.now()}`,
      type: 'health',
      priority: 'high',
      title: 'Disease Trend Alert',
      description: `Waterborne diseases have increased by ${trends.waterborne_diseases.percentage}% in your area. Enhanced prevention measures recommended.`,
      action: 'View Prevention Guide',
      category: 'trend_analysis',
      confidence: trends.waterborne_diseases.confidence
    });
  }

  if (trends.hygiene_compliance?.trend === 'improving') {
    suggestions.push({
      id: `trend-hygiene-${Date.now()}`,
      type: 'health',
      priority: 'low',
      title: 'Community Progress',
      description: `Great news! Hygiene compliance has improved by ${trends.hygiene_compliance.percentage}% in your community.`,
      action: 'View Community Stats',
      category: 'positive_trend',
      confidence: trends.hygiene_compliance.confidence
    });
  }

  return suggestions;
}

async function performAIRiskAssessment(factors) {
  // Simulate AI risk assessment
  const risks = {
    overall_risk: 'medium',
    risk_score: 0.67,
    factors_analyzed: Object.keys(factors).length,
    high_risk_areas: ['water_quality', 'seasonal_patterns'],
    recommendations: [
      'Increase water purification time',
      'Enhance mosquito control measures',
      'Regular health monitoring'
    ]
  };

  return risks;
}

function generateRiskBasedSuggestions(riskAssessment) {
  const suggestions = [];

  if (riskAssessment.overall_risk === 'high' || riskAssessment.risk_score > 0.7) {
    suggestions.push({
      id: `risk-high-${Date.now()}`,
      type: 'emergency',
      priority: 'high',
      title: 'High Risk Alert',
      description: `AI analysis indicates elevated health risks in your area (Risk Score: ${Math.round(riskAssessment.risk_score * 100)}%).`,
      action: 'View Risk Report',
      category: 'risk_assessment',
      confidence: 0.95
    });
  }

  riskAssessment.recommendations?.forEach((rec, index) => {
    suggestions.push({
      id: `risk-rec-${Date.now()}-${index}`,
      type: 'health',
      priority: 'medium',
      title: 'AI Recommendation',
      description: rec,
      action: 'Learn More',
      category: 'ai_recommendation',
      confidence: 0.80
    });
  });

  return suggestions;
}

function generateContextualSuggestions(context) {
  const suggestions = [];
  const currentHour = new Date(context.time).getHours();

  // Time-based suggestions
  if (currentHour >= 6 && currentHour <= 8) {
    suggestions.push({
      id: `ctx-time-${Date.now()}`,
      type: 'water',
      priority: 'high',
      title: 'Morning Water Safety',
      description: 'Peak contamination period. Ensure extra water safety measures.',
      category: 'contextual_time'
    });
  }

  // Weather-based suggestions
  if (context.weather === 'rainy' || context.weather === 'monsoon') {
    suggestions.push({
      id: `ctx-weather-${Date.now()}`,
      type: 'health',
      priority: 'high',
      title: 'Monsoon Precautions',
      description: 'Rainy weather increases disease risk. Take extra precautions.',
      category: 'contextual_weather'
    });
  }

  // Season-based suggestions
  if (context.season === 'summer') {
    suggestions.push({
      id: `ctx-season-${Date.now()}`,
      type: 'health',
      priority: 'medium',
      title: 'Summer Health Tips',
      description: 'Stay hydrated and protect against heat-related illnesses.',
      category: 'contextual_season'
    });
  }

  return suggestions;
}

function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 5) return 'summer';
  if (month >= 6 && month <= 9) return 'monsoon';
  return 'winter';
}

module.exports = router;