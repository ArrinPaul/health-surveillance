const express = require('express');
const { predictMaintenance } = require('../controllers/maintenanceController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: Predictive maintenance for water sources
 */

/**
 * @swagger
 * /maintenance/predict:
 *   post:
 *     summary: Predict maintenance needs for water sources
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               waterSources:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     usageHours:
 *                       type: number
 *                     contaminantLevel:
 *                       type: number
 *     responses:
 *       200:
 *         description: Maintenance predictions generated successfully
 *       500:
 *         description: Failed to generate maintenance predictions
 */

// Predict maintenance needs for water sources
router.post('/predict', predictMaintenance);

module.exports = router;