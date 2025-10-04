const express = require('express');
const { fuseData } = require('../controllers/dataFusionController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Data Fusion
 *   description: Multi-modal data fusion for better predictions
 */

/**
 * @swagger
 * /data-fusion:
 *   post:
 *     summary: Perform multi-modal data fusion for better predictions
 *     tags: [Data Fusion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               healthReports:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     score:
 *                       type: number
 *               waterQuality:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     quality:
 *                       type: number
 *               weatherData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     condition:
 *                       type: string
 *     responses:
 *       200:
 *         description: Data fusion completed successfully
 *       500:
 *         description: Failed to perform data fusion
 */

// Perform multi-modal data fusion
router.post('/', fuseData);

// Route to perform multi-modal data fusion
router.post('/fuse', fuseData);

module.exports = router;