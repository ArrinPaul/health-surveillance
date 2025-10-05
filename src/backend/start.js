#!/usr/bin/env node
/**
 * Health Surveillance System - Backend Startup Script
 * This script ensures proper initialization of all services
 */

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log(`📊 Loading environment variables...`);

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
  console.log('📝 Using default values for missing variables...');
}

// Set defaults for missing variables
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'UqH9+gsD2LNY4lEOm04GiqILv+DG6DJ23O7gP0Af1CQ=';
}
if (!process.env.PORT) {
  process.env.PORT = '5000';
}

// Check API keys and services
const apiKeys = {
  gemini: process.env.GEMINI_API_KEY,
  openweather: process.env.OPENWEATHER_API_KEY,
  convex: process.env.NEXT_PUBLIC_CONVEX_URL
};

console.log('🔐 API Keys Status:');
Object.entries(apiKeys).forEach(([service, key]) => {
  const status = key ? '✅ Configured' : '❌ Missing';
  console.log(`   ${service}: ${status}`);
});

// Now start the main application
console.log('🚀 Starting Health Surveillance Backend...\n');
require('./index.js');