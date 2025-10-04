const express = require('express');
const { submitReport, getReports } = require('../controllers/reportsController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Health data collection
 */

/**
 * @swagger
 * /reports/submit:
 *   post:
 *     summary: Submit a new health report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: string
 *               demographics:
 *                 type: object
 *               location:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [low, medium, high]
 *               labUpload:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report submitted successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get health reports by location and date
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *       400:
 *         description: Validation error
 */

// Submit a new health report
router.post('/submit', authenticate, submitReport);

// Get health reports by location and date
router.get('/', authenticate, getReports);

module.exports = router;