const { spawn } = require('child_process');
const Report = require('../models/Report');
const WaterData = require('../models/WaterData');

/**
 * Generate geo-spatial risk maps based on input data.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const generateRiskMap = (req, res) => {
  const { spatialData } = req.body;

  // Spawn Python process for geo-spatial risk mapping
  const pythonProcess = spawn('python', ['./src/backend/utils/risk_map.py']);

  // Send input data to Python process
  const inputData = JSON.stringify({ spatialData });
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
        const riskMap = JSON.parse(result);
        res.status(200).json(riskMap);
      } catch (error) {
        res.status(500).json({ message: 'Failed to parse risk map result' });
      }
    } else {
      res.status(500).json({ message: 'Risk map generation failed' });
    }
  });
};

module.exports = { generateRiskMap };