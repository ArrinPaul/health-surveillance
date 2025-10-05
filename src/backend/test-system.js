#!/usr/bin/env node
/**
 * Health Surveillance System - End-to-End Testing Script
 * This script tests all components and API endpoints
 */

const axios = require('axios');
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (color, message) => console.log(`${colors[color]}${message}${colors.reset}`);

class HealthSurveillanceTester {
  constructor() {
    this.baseURL = 'http://localhost:5000';
    this.frontendURL = 'http://localhost:3000';
    this.token = null;
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async test(name, testFn) {
    try {
      log('blue', `🧪 Testing: ${name}`);
      await testFn();
      this.results.passed++;
      this.results.tests.push({ name, status: 'PASS' });
      log('green', `✅ PASS: ${name}`);
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name, status: 'FAIL', error: error.message });
      log('red', `❌ FAIL: ${name} - ${error.message}`);
    }
  }

  async testBackendHealth() {
    const response = await axios.get(`${this.baseURL}/health`);
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.status || response.data.status !== 'OK') {
      throw new Error('Health check failed');
    }
  }

  async testAuthentication() {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
      role: 'health-worker'
    };
    
    const response = await axios.post(`${this.baseURL}/auth/login`, loginData);
    if (response.status !== 200) {
      throw new Error(`Login failed with status ${response.status}`);
    }
    
    if (!response.data.token) {
      throw new Error('No token received from login');
    }
    
    this.token = response.data.token;
  }

  async testAlertsEndpoint() {
    if (!this.token) {
      throw new Error('No authentication token available');
    }
    
    const headers = { Authorization: `Bearer ${this.token}` };
    const response = await axios.get(`${this.baseURL}/alerts`, { headers });
    
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  }

  async testWaterQualityEndpoint() {
    if (!this.token) {
      throw new Error('No authentication token available');
    }
    
    const headers = { Authorization: `Bearer ${this.token}` };
    const response = await axios.get(`${this.baseURL}/water-quality?lat=40.7128&lon=-74.0060`, { headers });
    
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  }

  async testGeminiService() {
    if (!this.token) {
      throw new Error('No authentication token available');
    }
    
    const headers = { Authorization: `Bearer ${this.token}` };
    const testData = {
      waterData: [
        { location: 'Downtown', contaminantLevel: 0.5 }
      ]
    };
    
    const response = await axios.post(`${this.baseURL}/water-quality/analyze`, testData, { headers });
    
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  }

  async testFrontendAccess() {
    try {
      const response = await axios.get(this.frontendURL, { timeout: 10000 });
      if (response.status !== 200) {
        throw new Error(`Frontend not accessible, status: ${response.status}`);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Frontend server not running on port 3000');
      }
      throw error;
    }
  }

  async waitForServer(url, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await axios.get(url, { timeout: 2000 });
        return true;
      } catch (error) {
        log('yellow', `⏳ Waiting for server... (${i + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    throw new Error(`Server not available at ${url} after ${maxAttempts} attempts`);
  }

  async runAllTests() {
    log('cyan', '\n🚀 Starting Health Surveillance System Tests\n');
    
    try {
      // Wait for servers to be ready
      log('blue', '📡 Checking server availability...');
      await this.waitForServer(`${this.baseURL}/health`);
      
      // Run all tests
      await this.test('Backend Health Check', () => this.testBackendHealth());
      await this.test('User Authentication', () => this.testAuthentication());
      await this.test('Alerts Endpoint', () => this.testAlertsEndpoint());
      await this.test('Water Quality Endpoint', () => this.testWaterQualityEndpoint());
      await this.test('Gemini AI Integration', () => this.testGeminiService());
      await this.test('Frontend Accessibility', () => this.testFrontendAccess());
      
    } catch (error) {
      log('red', `❌ Setup Error: ${error.message}`);
      this.results.failed++;
    }

    // Print results
    this.printResults();
  }

  printResults() {
    log('cyan', '\n📊 Test Results Summary\n');
    
    this.results.tests.forEach(test => {
      const status = test.status === 'PASS' ? '✅' : '❌';
      log(test.status === 'PASS' ? 'green' : 'red', `${status} ${test.name}`);
      if (test.error) {
        log('red', `   Error: ${test.error}`);
      }
    });
    
    log('cyan', '\n' + '='.repeat(50));
    log('bright', `Total Tests: ${this.results.passed + this.results.failed}`);
    log('green', `Passed: ${this.results.passed}`);
    log('red', `Failed: ${this.results.failed}`);
    
    const successRate = Math.round((this.results.passed / (this.results.passed + this.results.failed)) * 100);
    log('bright', `Success Rate: ${successRate}%`);
    
    if (this.results.failed === 0) {
      log('green', '\n🎉 All tests passed! System is ready for deployment.');
    } else {
      log('yellow', '\n⚠️  Some tests failed. Please review the errors above.');
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new HealthSurveillanceTester();
  tester.runAllTests().catch(error => {
    log('red', `❌ Test runner error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = HealthSurveillanceTester;