const express = require('express');
const { getCommunityInsights } = require('../controllers/communityInsightsController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get community health insights
router.get('/', authenticate, getCommunityInsights);

module.exports = router;