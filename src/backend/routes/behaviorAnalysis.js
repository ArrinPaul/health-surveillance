const express = require('express');
const { analyzeBehavior } = require('../controllers/behaviorAnalysisController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Behavior Analysis
 *   description: Analyze user behavior patterns
 */

/**
 * @swagger
 * /behavior-analysis:
 *   post:
 *     summary: Analyze user behavior patterns
 *     tags: [Behavior Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     reportsSubmitted:
 *                       type: number
 *     responses:
 *       200:
 *         description: Behavior analysis completed successfully
 *       500:
 *         description: Failed to analyze behavior
 */

// Analyze user behavior patterns
router.post('/', analyzeBehavior);

module.exports = router;