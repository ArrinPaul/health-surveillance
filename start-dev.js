#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🚀 Starting Health Surveillance Development Servers...\n');

// Start backend
console.log('📡 Starting Backend Server...');
const backend = spawn('node', ['run-backend.js'], {
  stdio: 'inherit',
  shell: true
});

// Wait a moment for backend to start
setTimeout(() => {
  console.log('🌐 Starting Frontend Server...');
  // Start frontend
  const frontend = spawn('npx', ['next', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (error) => {
    console.error('Frontend error:', error);
  });

}, 2000);

backend.on('error', (error) => {
  console.error('Backend error:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  process.exit(0);
});