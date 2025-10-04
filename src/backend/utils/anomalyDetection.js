const { spawn } = require('child_process');
const Report = require('../models/Report');
const WaterData = require('../models/WaterData');
const logger = require('./logger');

/**
 * Detect anomalies in the provided data.
 * @param {Array} data - The data to analyze for anomalies.
 * @returns {Promise} - Resolves with anomaly detection results.
 */
const detectAnomalies = (data) => {
  return new Promise((resolve, reject) => {
    // Spawn Python process for anomaly detection
    const pythonProcess = spawn('python', ['./src/backend/utils/anomaly_detection.py']);

    // Send input data to Python process
    const inputData = JSON.stringify({ data });
    pythonProcess.stdin.write(inputData);
    pythonProcess.stdin.end();

    let result = '';

    // Collect data from Python process
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const anomalies = JSON.parse(result);
          resolve(anomalies);
        } catch (error) {
          reject(new Error('Failed to parse anomaly detection result'));
        }
      } else {
        reject(new Error('Anomaly detection process failed'));
      }
    });
  });
};

// Background task for anomaly detection
const backgroundDetectAnomalies = async () => {
  try {
    const recentReports = await Report.find({
      timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) }, // Last 1 hour
    });

    const waterData = await WaterData.find({
      timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) },
    });

    // Example anomaly detection logic
    if (recentReports.length > 50) {
      logger.info('Anomaly detected: High number of reports in the last hour');
    }

    for (const water of waterData) {
      if (water.pH < 6.0 || water.turbidity > 10) {
        logger.info(`Anomaly detected: Unsafe water quality at ${water.lat}, ${water.lon}`);
      }
    }
  } catch (error) {
    logger.error('Error in anomaly detection:', error);
  }
};

module.exports = { detectAnomalies, backgroundDetectAnomalies };