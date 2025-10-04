const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get predictive analytics data
router.get('/', authenticate, getAnalytics);

module.exports = router;