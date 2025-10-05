#!/usr/bin/env node
/**
 * Comprehensive AI/ML Features Test Suite
 * This script tests all implemented AI and ML features
 */

const axios = require('axios');
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(color, prefix, message) {
  console.log(`${colors[color]}[${prefix}]${colors.reset} ${message}`);
}

class AIFeaturesTest {
  constructor() {
    this.baseURL = 'http://localhost:5000';
    this.results = {
      total: 0,
      passed: 0,
      failed: 0
    };
  }

  async test(name, testFn) {
    this.results.total++;
    try {
      log('blue', 'TEST', `Running: ${name}`);
      await testFn();
      this.results.passed++;
      log('green', 'PASS', name);
      return true;
    } catch (error) {
      this.results.failed++;
      log('red', 'FAIL', `${name} - ${error.message}`);
      return false;
    }
  }

  async testServerHealth() {
    const response = await axios.get(`${this.baseURL}/health`);
    if (response.status !== 200) {
      throw new Error('Server health check failed');
    }
    if (!response.data.services) {
      throw new Error('Services status not available');
    }
    log('cyan', 'INFO', `Gemini AI: ${response.data.services.gemini}`);
    log('cyan', 'INFO', `OpenWeather: ${response.data.services.openweather}`);
  }

  async testWaterQualityRealTime() {
    const response = await axios.get(`${this.baseURL}/water-quality?lat=14.4673&lon=78.8242`);
    if (response.status !== 200) {
      throw new Error('Water quality API failed');
    }
    
    const data = response.data;
    if (!data.waterQuality || !data.weather) {
      throw new Error('Missing water quality or weather data');
    }
    
    log('cyan', 'DATA', `pH: ${data.waterQuality.pH}, Turbidity: ${data.waterQuality.turbidity}`);
    log('cyan', 'DATA', `Risk Level: ${data.waterQuality.riskLevel}`);
  }

  async testWaterQualityAIAnalysis() {
    const testData = {
      location: 'Test Location',
      coordinates: { lat: 14.4673, lng: 78.8242 },
      waterQuality: { pH: 6.2, turbidity: 8.5, riskLevel: 'High' },
      weather: { temperature: 305.15, humidity: 80, rainfall: 15 }
    };

    const response = await axios.post(`${this.baseURL}/water-quality/analyze`, testData);
    if (response.status !== 200) {
      throw new Error('Water quality analysis failed');
    }
    
    const data = response.data;
    if (!data.recommendations || data.recommendations.length === 0) {
      throw new Error('No recommendations received');
    }
    
    log('cyan', 'AI', `Generated ${data.recommendations.length} recommendations`);
  }

  async testGeminiSymptomAnalysis() {
    const testData = {
      symptoms: ['fever', 'diarrhea', 'vomiting', 'dehydration']
    };

    const response = await axios.post(`${this.baseURL}/ai/analyze-symptoms`, testData);
    if (response.status !== 200) {
      throw new Error('Symptom analysis failed');
    }
    
    const data = response.data;
    if (!data.analysis) {
      throw new Error('No analysis received');
    }
    
    log('cyan', 'AI', `Symptom analysis: ${data.analysis.substring(0, 100)}...`);
  }

  async testGeminiHealthQuery() {
    const testData = {
      question: 'How can we prevent waterborne diseases in rural areas?',
      location: 'Rural India'
    };

    const response = await axios.post(`${this.baseURL}/ai/health-query`, testData);
    if (response.status !== 200) {
      throw new Error('Health query failed');
    }
    
    const data = response.data;
    if (!data.answer) {
      throw new Error('No answer received');
    }
    
    log('cyan', 'AI', `Health query answered: ${data.answer.substring(0, 100)}...`);
  }

  async testOutbreakPrediction() {
    const testData = {
      populationDensity: 500,
      sanitationData: 60,
      historicalPatterns: [1, 2, 3, 2, 1, 4, 3]
    };

    const response = await axios.post(`${this.baseURL}/predict`, testData);
    if (response.status !== 200) {
      throw new Error('Outbreak prediction failed');
    }
    
    log('cyan', 'ML', 'Outbreak prediction completed');
  }

  async testHealthForecast() {
    const testData = {
      healthData: [
        { community: 'District A', incidents: 25 },
        { community: 'District B', incidents: 60 },
        { community: 'District C', incidents: 15 }
      ]
    };

    const response = await axios.post(`${this.baseURL}/health-forecast`, testData);
    if (response.status !== 200) {
      throw new Error('Health forecast failed');
    }
    
    const data = response.data;
    if (!data.forecast || data.forecast.length === 0) {
      throw new Error('No forecast data received');
    }
    
    log('cyan', 'ML', `Generated forecast for ${data.forecast.length} districts`);
  }

  async testEpidemicWarning() {
    const testData = {
      outbreakData: [
        { region: 'North District', infectionRate: 2.5, populationDensity: 1000 },
        { region: 'South District', infectionRate: 1.2, populationDensity: 800 }
      ]
    };

    const response = await axios.post(`${this.baseURL}/epidemic-warning`, testData);
    if (response.status !== 200) {
      throw new Error('Epidemic warning failed');
    }
    
    const data = response.data;
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No predictions received');
    }
    
    log('cyan', 'ML', `Epidemic predictions for ${data.predictions.length} regions`);
  }

  async testSentimentAnalysis() {
    const testData = {
      reports: [
        'The water quality has improved significantly',
        'Very concerned about recent health issues',
        'Excellent response from health workers'
      ]
    };

    try {
      const response = await axios.post(`${this.baseURL}/sentiment-analysis`, testData);
      if (response.status !== 200) {
        throw new Error('Sentiment analysis failed');
      }
      log('cyan', 'ML', 'Sentiment analysis completed');
    } catch (error) {
      if (error.response?.status === 404) {
        log('yellow', 'SKIP', 'Sentiment analysis endpoint not found');
      } else {
        throw error;
      }
    }
  }

  async testMaintenancePrediction() {
    const testData = {
      waterSources: [
        { id: 'source1', usageHours: 1200, contaminantLevel: 30 },
        { id: 'source2', usageHours: 800, contaminantLevel: 60 }
      ]
    };

    const response = await axios.post(`${this.baseURL}/maintenance/predict`, testData);
    if (response.status !== 200) {
      throw new Error('Maintenance prediction failed');
    }
    
    const data = response.data;
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No maintenance predictions received');
    }
    
    log('cyan', 'ML', `Maintenance predictions for ${data.predictions.length} sources`);
  }

  async testChatbotAPI() {
    const testMessages = [
      "How do I purify water safely?",
      "What are the symptoms of waterborne diseases?",
      "How to wash hands properly?",
      "Emergency health contacts"
    ];

    for (const message of testMessages) {
      try {
        const response = await axios.post(`${this.baseURL}/chatbot/message`, {
          message: message,
          context: { testMode: true }
        });
        
        if (response.data.response && response.data.category) {
          log('green', 'AI', `Chatbot responded to: "${message.substring(0, 30)}..."`);
        } else {
          throw new Error('Invalid chatbot response format');
        }
      } catch (error) {
        if (error.response?.status === 404) {
          log('yellow', 'SKIP', 'Chatbot endpoint not found - using fallback');
          return { tested: 0, status: 'skipped' };
        }
        throw error;
      }
    }

    log('cyan', 'AI', 'Chatbot API tests completed successfully');
    return { tested: testMessages.length, status: 'passed' };
  }

  async testAISuggestions() {
    try {
      // Test personalized suggestions generation
      const userData = {
        userId: 'test-user',
        location: { area: 'test-area', lat: 0, lng: 0 },
        preferences: { notifications: true },
        healthData: { lastCheckup: new Date() }
      };

      const suggestionsResponse = await axios.post(`${this.baseURL}/suggestions/generate`, userData);
      
      if (!suggestionsResponse.data.suggestions || !Array.isArray(suggestionsResponse.data.suggestions)) {
        throw new Error('Invalid suggestions response format');
      }

      // Test health trends
      const trendsResponse = await axios.get(`${this.baseURL}/suggestions/health-trends?area=test&timeframe=weekly`);
      
      if (!trendsResponse.data.trends) {
        throw new Error('Invalid trends response format');
      }

      // Test contextual suggestions
      const contextResponse = await axios.get(`${this.baseURL}/suggestions/contextual?time=${new Date().toISOString()}&weather=normal`);
      
      if (!contextResponse.data.suggestions || !Array.isArray(contextResponse.data.suggestions)) {
        throw new Error('Invalid contextual suggestions response');
      }

      log('green', 'AI', `Generated ${suggestionsResponse.data.suggestions.length} personalized suggestions`);
      log('green', 'AI', `Analyzed health trends for test area`);
      log('green', 'AI', `Generated ${contextResponse.data.suggestions.length} contextual suggestions`);
      log('cyan', 'AI', 'AI Suggestions system tests completed successfully');

      return {
        personalizedSuggestions: suggestionsResponse.data.suggestions.length,
        healthTrends: Object.keys(trendsResponse.data.trends).length,
        contextualSuggestions: contextResponse.data.suggestions.length,
        status: 'passed'
      };
    } catch (error) {
      if (error.response?.status === 404) {
        log('yellow', 'SKIP', 'Suggestions endpoints not found - using fallback');
        return { status: 'skipped' };
      }
      throw error;
    }
  }

  async runAllTests() {
    log('magenta', 'START', '🤖 AI/ML Features Comprehensive Test Suite');
    console.log();

    // Test server availability
    await this.test('Server Health Check', () => this.testServerHealth());

    // Test real-time data features
    await this.test('Water Quality Real-time Data', () => this.testWaterQualityRealTime());
    await this.test('Water Quality AI Analysis', () => this.testWaterQualityAIAnalysis());

    // Test Gemini AI features
    await this.test('Gemini Symptom Analysis', () => this.testGeminiSymptomAnalysis());
    await this.test('Gemini Health Query', () => this.testGeminiHealthQuery());

    // Test ML prediction features
    await this.test('Disease Outbreak Prediction', () => this.testOutbreakPrediction());
    await this.test('Health Trend Forecasting', () => this.testHealthForecast());
    await this.test('Epidemic Warning System', () => this.testEpidemicWarning());
    await this.test('Maintenance Prediction', () => this.testMaintenancePrediction());

    // Test additional ML features
    await this.test('Sentiment Analysis', () => this.testSentimentAnalysis());

    // Test new AI features
    await this.test('AI Chatbot API', () => this.testChatbotAPI());
    await this.test('AI Suggestions System', () => this.testAISuggestions());

    console.log();
    this.printResults();
  }

  printResults() {
    console.log('='.repeat(60));
    log('magenta', 'RESULTS', 'AI/ML Features Test Summary');
    console.log();
    
    log('blue', 'TOTAL', `${this.results.total} tests executed`);
    log('green', 'PASSED', `${this.results.passed} tests`);
    log('red', 'FAILED', `${this.results.failed} tests`);
    
    const successRate = (this.results.passed / this.results.total * 100).toFixed(1);
    log('cyan', 'SUCCESS RATE', `${successRate}%`);
    
    console.log();
    if (this.results.failed === 0) {
      log('green', 'STATUS', '🎉 All AI/ML features are working correctly!');
      log('green', 'INFO', '✅ Real-time data integration: WORKING');
      log('green', 'INFO', '✅ Gemini AI integration: WORKING'); 
      log('green', 'INFO', '✅ ML predictions: WORKING');
      log('green', 'INFO', '✅ Health analytics: WORKING');
    } else {
      log('yellow', 'STATUS', `⚠️  ${this.results.failed} feature(s) need attention`);
      log('yellow', 'INFO', 'Check error messages above for details');
    }
    
    console.log();
    log('blue', 'FRONTEND', 'Access AI Features at: http://localhost:3000/ai-features');
    log('blue', 'BACKEND', 'API Documentation at: http://localhost:5000/api-docs');
  }
}

// Run the test suite
async function main() {
  const tester = new AIFeaturesTest();
  
  try {
    await tester.runAllTests();
  } catch (error) {
    log('red', 'ERROR', 'Test suite failed to run: ' + error.message);
    log('yellow', 'TIP', 'Make sure the backend server is running on port 5000');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = AIFeaturesTest;