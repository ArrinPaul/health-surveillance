const Report = require('../models/Report');
const Alert = require('../models/Alert');
const WaterData = require('../models/WaterData');
const logger = require('../utils/logger'); // Assuming you have a logger utility

// Background task to generate alerts
const generateAlerts = async () => {
  try {
    const recentReports = await Report.find({
      timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) }, // Last 1 hour
    });

    const waterData = await WaterData.find({
      timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) },
    });

    for (const report of recentReports) {
      if (report.severity === 'high') {
        await Alert.create({
          location: report.location,
          type: 'Health Report',
          severity: 'high',
        });
      }
    }

    for (const water of waterData) {
      if (water.pH < 6.5 || water.turbidity > 5) {
        await Alert.create({
          location: `${water.lat},${water.lon}`,
          type: 'Water Quality',
          severity: 'high',
        });
      }
    }

    // AI-driven alert for high-risk areas
    const highRiskReports = recentReports.filter((report) => report.severity === 'high');
    if (highRiskReports.length > 10) {
      await Alert.create({
        location: 'Multiple Locations',
        type: 'AI-Driven Alert',
        severity: 'high',
      });
    }

    // Prioritize alerts based on severity
    const alerts = await Alert.find({}); // Fetch all alerts for prioritization
    const prioritizedAlerts = alerts.sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });

    logger.info('Prioritized Alerts:', prioritizedAlerts);
  } catch (error) {
    console.error('Error generating alerts:', error);
  }
};

module.exports = generateAlerts;