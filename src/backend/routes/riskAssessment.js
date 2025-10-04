const express = require('express');
const { assessRisk } = require('../controllers/riskAssessmentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Risk Assessment
 *   description: Dynamic risk assessment based on environmental and health data
 */

/**
 * @swagger
 * /risk-assessment:
 *   post:
 *     summary: Assess dynamic risk levels
 *     tags: [Risk Assessment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rainfall:
 *                 type: number
 *               temperature:
 *                 type: number
 *               healthData:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Risk assessment successful
 *       500:
 *         description: Risk assessment failed
 */

// Assess dynamic risk levels
router.post('/', assessRisk);

module.exports = router;