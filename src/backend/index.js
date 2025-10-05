const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const setupSwagger = require('./config/swagger');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Load environment variables from project root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
setupSwagger(app);

// Routes
app.use('/ai', require('./routes/ai'));
app.use('/auth', require('./routes/auth'));
app.use('/reports', require('./routes/reports'));
app.use('/water-quality', require('./routes/waterQuality'));
app.use('/predict', require('./routes/predict'));
app.use('/alerts', require('./routes/alerts'));
app.use('/analytics', require('./routes/analytics'));
app.use('/behavior-analysis', require('./routes/behaviorAnalysis'));
app.use('/climate-impact', require('./routes/climateImpact'));
app.use('/community-insights', require('./routes/communityInsights'));
app.use('/data-fusion', require('./routes/dataFusion'));
app.use('/epidemic-warning', require('./routes/epidemicWarning'));
app.use('/health-forecast', require('./routes/healthForecast'));
app.use('/iot', require('./routes/iot'));
app.use('/maintenance', require('./routes/maintenance'));
app.use('/resource-allocation', require('./routes/resourceAllocation'));
app.use('/risk-assessment', require('./routes/riskAssessment'));
app.use('/risk-map', require('./routes/riskMap'));
app.use('/sentiment-analysis', require('./routes/sentimentAnalysis'));
app.use('/summarize', require('./routes/summarize'));
app.use('/worker-performance', require('./routes/workerPerformance'));
app.use('/chatbot', require('./routes/chatbot'));
app.use('/suggestions', require('./routes/suggestions'));

// Error handling middleware
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      gemini: process.env.GEMINI_API_KEY ? 'configured' : 'not_configured',
      openweather: process.env.OPENWEATHER_API_KEY ? 'configured' : 'not_configured',
      convex: process.env.CONVEX_DEPLOY_KEY ? 'configured' : 'not_configured'
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Health Surveillance API',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/health'
  });
});

// Start server
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
app.listen(BACKEND_PORT, () => {
  console.log(`🚀 Health Surveillance API running on port ${BACKEND_PORT}`);
  console.log(`📚 API Documentation: http://localhost:${BACKEND_PORT}/api-docs`);
  console.log(`💓 Health Check: http://localhost:${BACKEND_PORT}/health`);
});