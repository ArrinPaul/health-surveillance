const express = require('express');
const { ingestIoTData } = require('../controllers/iotController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: IoT
 *   description: IoT data ingestion
 */

/**
 * @swagger
 * /iot/ingest:
 *   post:
 *     summary: Ingest IoT sensor data
 *     tags: [IoT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *               sensorData:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *     responses:
 *       200:
 *         description: IoT data ingested successfully
 *       500:
 *         description: Failed to ingest IoT data
 */

// Ingest IoT sensor data
router.post('/ingest', ingestIoTData);

module.exports = router;