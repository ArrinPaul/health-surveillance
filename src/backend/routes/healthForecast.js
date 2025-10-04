const express = require('express');
const { forecastHealthTrends } = require('../controllers/healthForecastController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health Forecast
 *   description: Community health forecasting
 */

/**
 * @swagger
 * /health-forecast:
 *   post:
 *     summary: Forecast community health trends
 *     tags: [Health Forecast]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               healthData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     community:
 *                       type: string
 *                     incidents:
 *                       type: number
 *     responses:
 *       200:
 *         description: Health forecast generated successfully
 *       500:
 *         description: Failed to generate health forecast
 */

// Forecast community health trends
router.post('/', forecastHealthTrends);

module.exports = router;