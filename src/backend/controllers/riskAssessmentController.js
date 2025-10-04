const { spawn } = require('child_process');

// Calculate risk scores for areas
exports.calculateRisk = async (req, res) => {
  const { waterQuality, weatherData, healthData } = req.body;

  if (!waterQuality || !weatherData || !healthData) {
    return res.status(400).json({ message: 'Water quality, weather data, and health data are required' });
  }

  try {
    // Integrate ML model for risk assessment
    const pythonProcess = spawn('python', ['./src/backend/utils/risk_assessment.py']);

    // Send input data to Python process
    pythonProcess.stdin.write(JSON.stringify({ waterQuality, weatherData, healthData }));
    pythonProcess.stdin.end();

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        const riskAssessment = JSON.parse(result);
        res.status(200).json(riskAssessment);
      } else {
        res.status(500).json({ message: 'Risk assessment failed' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Assess dynamic risk levels based on input data.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const assessRisk = (req, res) => {
  const { rainfall, temperature, healthData } = req.body;

  // Spawn Python process for risk assessment
  const pythonProcess = spawn('python', ['./src/backend/utils/risk_assessment.py']);

  // Send input data to Python process
  const inputData = JSON.stringify({
    rainfall,
    temperature,
    healthData,
  });
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
        const riskLevels = JSON.parse(result);
        res.status(200).json(riskLevels);
      } catch (error) {
        res.status(500).json({ message: 'Failed to parse risk assessment result' });
      }
    } else {
      res.status(500).json({ message: 'Risk assessment process failed' });
    }
  });
};

module.exports = { assessRisk };