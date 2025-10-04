const express = require('express');
const { generateRiskMap } = require('../controllers/riskMapController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Risk Map
 *   description: Geo-spatial risk mapping
 */

/**
 * @swagger
 * /risk-map:
 *   post:
 *     summary: Generate geo-spatial risk maps
 *     tags: [Risk Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spatialData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *                     riskFactor:
 *                       type: number
 *     responses:
 *       200:
 *         description: Risk map generated successfully
 *       500:
 *         description: Failed to generate risk map
 */

// Generate geo-spatial risk maps
router.post('/', generateRiskMap);

module.exports = router;