const express = require('express');
const { optimizeResourceAllocation } = require('../controllers/resourceAllocationController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resource Allocation
 *   description: Optimize resource allocation to high-risk areas
 */

/**
 * @swagger
 * /resource-allocation:
 *   post:
 *     summary: Optimize resource allocation to high-risk areas
 *     tags: [Resource Allocation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               riskAreas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     riskLevel:
 *                       type: number
 *               resources:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Resource allocation optimized successfully
 *       500:
 *         description: Failed to optimize resource allocation
 */

// Optimize resource allocation to high-risk areas
router.post('/', optimizeResourceAllocation);

module.exports = router;