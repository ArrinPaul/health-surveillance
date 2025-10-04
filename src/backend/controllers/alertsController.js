// Mock data for alerts (replace with Convex queries later)
const mockAlerts = [
  {
    id: '1',
    location: 'Downtown',
    type: 'water_contamination',
    severity: 'high',
    message: 'High bacteria levels detected in water supply',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: '2',
    location: 'Suburb A',
    type: 'disease_outbreak',
    severity: 'medium',
    message: 'Increased flu cases reported in the area',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    resolved: false
  }
];

// Get alerts by location
exports.getAlerts = async (req, res) => {
  const { location } = req.query;

  try {
    let alerts = mockAlerts;
    if (location) {
      alerts = mockAlerts.filter(alert => 
        alert.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Generate personalized health alerts based on user preferences and data.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const generatePersonalizedAlerts = (req, res) => {
  const { userPreferences, healthData } = req.body;

  // Example: Use user preferences to customize alert thresholds
  const alerts = healthData.map((data) => {
    const threshold = userPreferences[data.type] || 0.5; // Default threshold
    return {
      type: data.type,
      value: data.value,
      alert: data.value > threshold,
    };
  });

  res.status(200).json({ alerts });
};

exports.generatePersonalizedAlerts = generatePersonalizedAlerts;