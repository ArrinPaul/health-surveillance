const express = require('express');
const { predictOutbreak } = require('../controllers/predictController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Predict
 *   description: Disease outbreak prediction
 */

/**
 * @swagger
 * /predict:
 *   post:
 *     summary: Predict disease outbreaks
 *     tags: [Predict]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               populationDensity:
 *                 type: number
 *               sanitationData:
 *                 type: number
 *               historicalPatterns:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Prediction successful
 *       500:
 *         description: Prediction failed
 */

// Predict disease outbreaks
router.post('/', predictOutbreak);

module.exports = router;