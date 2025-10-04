const Report = require('../models/Report');
const WaterData = require('../models/WaterData');
const Alert = require('../models/Alert');

// Get predictive analytics data
exports.getAnalytics = async (req, res) => {
  try {
    const reportStats = await Report.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
    ]);

    const waterStats = await WaterData.aggregate([
      { $group: { _id: '$location', avgPH: { $avg: '$pH' }, avgTurbidity: { $avg: '$turbidity' } } },
    ]);

    const alertStats = await Alert.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
    ]);

    res.status(200).json({ reportStats, waterStats, alertStats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics data', error: error.message });
  }
};