/**
 * Perform multi-modal data fusion for better predictions.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const fuseData = (req, res) => {
  const { healthReports, waterQuality, weatherData } = req.body;

  // Example: Simulate data fusion with advanced logic
  const fusedData = healthReports.map((report, index) => {
    const water = waterQuality[index % waterQuality.length];
    const weather = weatherData[index % weatherData.length];

    const fusionScore = (report.score * 0.5) + (water.quality * 0.3) + (weather.conditionScore * 0.2);

    return {
      reportId: report.id,
      fusionScore,
      details: {
        healthScore: report.score,
        waterQuality: water.quality,
        weatherCondition: weather.condition,
      },
    };
  });

  res.status(200).json({ fusedData });
};

module.exports = { fuseData };