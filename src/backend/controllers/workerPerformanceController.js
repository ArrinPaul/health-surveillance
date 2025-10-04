/**
 * Analyze health worker performance.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const analyzeWorkerPerformance = (req, res) => {
  const { workerData } = req.body;

  // Example: Simulate performance analysis
  const analysis = workerData.map((worker) => {
    const performance = worker.successfulInterventions / worker.totalInterventions;
    return {
      workerId: worker.id,
      performance,
    };
  });

  res.status(200).json({ analysis });
};

module.exports = { analyzeWorkerPerformance };