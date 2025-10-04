const express = require('express');
const { analyzeWorkerPerformance } = require('../controllers/workerPerformanceController');

const router = express.Router();

// Route to analyze health worker performance
router.post('/analyze', analyzeWorkerPerformance);

module.exports = router;