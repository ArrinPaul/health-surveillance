const express = require('express');
const { predictEpidemicSpread } = require('../controllers/epidemicWarningController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Epidemic Warning
 *   description: Early warning system for epidemics
 */

/**
 * @swagger
 * /epidemic-warning:
 *   post:
 *     summary: Predict the likelihood of epidemic spread
 *     tags: [Epidemic Warning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outbreakData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     region:
 *                       type: string
 *                     infectionRate:
 *                       type: number
 *     responses:
 *       200:
 *         description: Epidemic spread prediction completed successfully
 *       500:
 *         description: Failed to predict epidemic spread
 */

// Predict the likelihood of epidemic spread
router.post('/', predictEpidemicSpread);

// Route to predict epidemic spread
router.post('/predict', predictEpidemicSpread);

module.exports = router;