const express = require('express');
const { getAlerts, generatePersonalizedAlerts } = require('../controllers/alertsController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Alerts system
 */

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Get alerts by location
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Alerts retrieved successfully
 *       400:
 *         description: Validation error
 */

// Get alerts by location
router.get('/', authenticate, getAlerts);

/**
 * @swagger
 * /alerts/personalized:
 *   post:
 *     summary: Generate personalized health alerts
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userPreferences:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *               healthData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     value:
 *                       type: number
 *     responses:
 *       200:
 *         description: Alerts generated successfully
 *       500:
 *         description: Failed to generate alerts
 */

// Generate personalized health alerts
router.post('/personalized', authenticate, generatePersonalizedAlerts);

module.exports = router;