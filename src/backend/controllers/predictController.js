const { spawn } = require('child_process');
const HistoricalData = require('../models/HistoricalData');

/**
 * Predict disease outbreaks based on input data.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
exports.predictOutbreak = async (req, res) => {
  const { symptoms, waterQuality, weatherData } = req.body;

  if (!symptoms || !waterQuality || !weatherData) {
    return res.status(400).json({ message: 'Symptoms, water quality, and weather data are required' });
  }

  try {
    // Fetch historical data for the region
    const historicalData = await HistoricalData.find({
      location: weatherData.location,
    });

    // Spawn Python process for ML prediction
    const pythonProcess = spawn('python', ['./src/backend/utils/ml_predict.py']);

    // Send input data to Python process
    const inputData = JSON.stringify({ symptoms, waterQuality, weatherData, historicalData });
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
          const prediction = JSON.parse(result);
          res.status(200).json(prediction);
        } catch (error) {
          res.status(500).json({ message: 'Failed to parse prediction result' });
        }
      } else {
        res.status(500).json({ message: 'Prediction process failed' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Predict disease outbreaks based on input data and provide explanations.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
exports.predictOutbreakWithExplanation = (req, res) => {
  const { populationDensity, sanitationData, historicalPatterns } = req.body;

  // Spawn Python process for ML prediction with explanation
  const pythonProcess = spawn('python', ['./src/backend/utils/ml_predict_explain.py']);

  // Send input data to Python process
  const inputData = JSON.stringify({
    populationDensity,
    sanitationData,
    historicalPatterns,
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
        const predictionWithExplanation = JSON.parse(result);
        res.status(200).json(predictionWithExplanation);
      } catch (error) {
        res.status(500).json({ message: 'Failed to parse prediction result with explanation' });
      }
    } else {
      res.status(500).json({ message: 'Prediction process with explanation failed' });
    }
  });
};