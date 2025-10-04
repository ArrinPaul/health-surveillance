const { spawn } = require('child_process');

/**
 * Retrain the ML model with new data.
 * @param {Array} trainingData - The new training data.
 * @returns {Promise} - Resolves when the retraining is complete.
 */
const retrainModel = (trainingData) => {
  return new Promise((resolve, reject) => {
    // Spawn Python process for model retraining
    const pythonProcess = spawn('python', ['./src/backend/utils/model_retraining.py']);

    // Send training data to Python process
    const inputData = JSON.stringify({ trainingData });
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
        resolve(result);
      } else {
        reject(new Error('Model retraining process failed'));
      }
    });
  });
};

module.exports = { retrainModel };