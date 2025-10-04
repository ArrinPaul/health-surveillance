const express = require('express');
const { analyzeClimateImpact } = require('../controllers/climateImpactController');

const router = express.Router();

// Route to analyze climate change impact
router.post('/analyze', analyzeClimateImpact);

module.exports = router;