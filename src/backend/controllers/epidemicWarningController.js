/**
 * Predict the likelihood of epidemic spread.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const predictEpidemicSpread = (req, res) => {
  const { outbreakData } = req.body;

  // Example: Simulate epidemic spread prediction with advanced logic
  const predictions = outbreakData.map((data) => {
    const spreadScore = (data.infectionRate * 0.6) + (data.populationDensity * 0.4);
    const spreadLikelihood = spreadScore > 1.5 ? 'High' : 'Low';
    return {
      region: data.region,
      spreadScore,
      spreadLikelihood,
    };
  });

  res.status(200).json({ predictions });
};

module.exports = { predictEpidemicSpread };