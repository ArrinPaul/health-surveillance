#!/usr/bin/env node
/**
 * Health Surveillance System - Unified Development Startup Script
 * This script starts both frontend and backend with proper environment loading
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
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

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  log('yellow', 'WARNING', '.env file not found. Please create one based on .env.example');
  log('blue', 'INFO', 'You can copy .env.example to .env and fill in your actual API keys');
}

// Start backend server
log('cyan', 'BACKEND', 'Starting backend server on port 5000...');
const backend = spawn('node', ['start.js'], {
  cwd: path.join(__dirname, 'src', 'backend'),
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

backend.stdout.on('data', (data) => {
  const output = data.toString().trim();
  if (output) {
    log('cyan', 'BACKEND', output);
  }
});

backend.stderr.on('data', (data) => {
  const output = data.toString().trim();
  if (output) {
    log('red', 'BACKEND ERROR', output);
  }
});

// Start frontend server after a short delay
setTimeout(() => {
  log('magenta', 'FRONTEND', 'Starting Next.js frontend on port 3000...');
  
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true
  });

  frontend.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log('magenta', 'FRONTEND', output);
    }
  });

  frontend.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log('red', 'FRONTEND ERROR', output);
    }
  });

  frontend.on('close', (code) => {
    log('yellow', 'FRONTEND', `Process exited with code ${code}`);
    process.exit(code);
  });
}, 2000);

backend.on('close', (code) => {
  log('yellow', 'BACKEND', `Process exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  log('yellow', 'SYSTEM', 'Shutting down servers...');
  backend.kill('SIGINT');
  process.exit(0);
});

log('green', 'SYSTEM', 'Health Surveillance System starting...');
log('blue', 'INFO', 'Frontend will be available at: http://localhost:3000');
log('blue', 'INFO', 'Backend will be available at: http://localhost:5000');
log('yellow', 'INFO', 'Press Ctrl+C to stop both servers');