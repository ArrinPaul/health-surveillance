const Report = require('../models/Report');

// Submit a new health report
exports.submitReport = async (req, res) => {
  const { symptoms, demographics, location, severity, labUpload } = req.body;

  try {
    const report = new Report({
      userId: req.user.id,
      symptoms,
      demographics,
      location,
      severity,
      labUpload,
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get health reports by location and date
exports.getReports = async (req, res) => {
  const { location, date } = req.query;

  try {
    const query = {};
    if (location) query.location = location;
    if (date) query.timestamp = { $gte: new Date(date) };

    const reports = await Report.find(query);
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};