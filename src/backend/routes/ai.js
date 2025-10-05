const express = require('express');
const geminiService = require('../services/geminiService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI Features
 *   description: AI-powered health analysis and insights
 */

/**
 * @swagger
 * /ai/analyze-symptoms:
 *   post:
 *     summary: Analyze symptoms using AI
 *     tags: [AI Features]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Symptom analysis completed
 */
router.post('/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ error: 'Symptoms array is required' });
    }

    const analysis = await geminiService.analyzeSymptoms(symptoms);
    
    res.json({
      analysis,
      symptoms: symptoms,
      timestamp: new Date().toISOString(),
      aiPowered: !analysis.includes('not available')
    });
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    res.status(500).json({ error: 'Failed to analyze symptoms' });
  }
});

/**
 * @swagger
 * /ai/health-query:
 *   post:
 *     summary: Ask AI health assistant a question
 *     tags: [AI Features]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Health query answered
 */
router.post('/health-query', async (req, res) => {
  try {
    const { question, location = '' } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const context = location ? `Location: ${location}` : '';
    const answer = await geminiService.answerHealthQuery(question, context);
    
    res.json({
      answer,
      question,
      location,
      timestamp: new Date().toISOString(),
      aiPowered: !answer.includes('not available')
    });
  } catch (error) {
    console.error('Error processing health query:', error);
    res.status(500).json({ error: 'Failed to process health query' });
  }
});

/**
 * @swagger
 * /ai/generate-alert:
 *   post:
 *     summary: Generate AI health alert
 *     tags: [AI Features]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               riskData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Health alert generated
 */
router.post('/generate-alert', async (req, res) => {
  try {
    const { riskData } = req.body;
    
    if (!riskData) {
      return res.status(400).json({ error: 'Risk data is required' });
    }

    const alert = await geminiService.generateHealthAlert(riskData);
    
    res.json({
      alert,
      riskData,
      timestamp: new Date().toISOString(),
      aiPowered: !alert.includes('not available')
    });
  } catch (error) {
    console.error('Error generating alert:', error);
    res.status(500).json({ error: 'Failed to generate alert' });
  }
});

/**
 * @swagger
 * /ai/summarize-report:
 *   post:
 *     summary: Summarize health report using AI
 *     tags: [AI Features]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Report summary generated
 */
router.post('/summarize-report', async (req, res) => {
  try {
    const { reportData } = req.body;
    
    if (!reportData) {
      return res.status(400).json({ error: 'Report data is required' });
    }

    const summary = await geminiService.summarizeHealthReport(reportData);
    
    res.json({
      summary,
      reportData,
      timestamp: new Date().toISOString(),
      aiPowered: !summary.includes('not available')
    });
  } catch (error) {
    console.error('Error summarizing report:', error);
    res.status(500).json({ error: 'Failed to summarize report' });
  }
});

module.exports = router;