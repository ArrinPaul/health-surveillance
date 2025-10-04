const Report = require('../models/Report');

// Get community health insights
exports.getCommunityInsights = async (req, res) => {
  try {
    const insights = await Report.aggregate([
      { $group: { _id: '$location', totalCases: { $sum: 1 }, severity: { $push: '$severity' } } },
    ]);

    const formattedInsights = insights.map((insight) => ({
      location: insight._id,
      totalCases: insight.totalCases,
      highSeverityCases: insight.severity.filter((s) => s === 'high').length,
    }));

    res.status(200).json(formattedInsights);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch community insights', error: error.message });
  }
};