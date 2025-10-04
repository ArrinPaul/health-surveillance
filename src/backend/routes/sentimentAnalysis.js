const express = require('express');
const { analyzeSentiment } = require('../controllers/sentimentAnalysisController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sentiment Analysis
 *   description: Perform sentiment analysis on health reports
 */

/**
 * @swagger
 * /sentiment-analysis:
 *   post:
 *     summary: Perform sentiment analysis on health reports
 *     tags: [Sentiment Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reports:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     text:
 *                       type: string
 *     responses:
 *       200:
 *         description: Sentiment analysis completed successfully
 *       500:
 *         description: Failed to perform sentiment analysis
 */

// Perform sentiment analysis on health reports
router.post('/', analyzeSentiment);

// Route to perform sentiment analysis on reports
router.post('/analyze', analyzeSentiment);

module.exports = router;