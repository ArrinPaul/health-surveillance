const express = require('express');
const { summarizeReport } = require('../controllers/summarizeController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Summarize health and risk reports
router.post('/', authenticate, summarizeReport);

module.exports = router;