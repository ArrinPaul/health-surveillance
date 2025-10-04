/**
 * Handle IoT data ingestion.
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
const ingestIoTData = (req, res) => {
  const { deviceId, sensorData } = req.body;

  // Example: Process IoT data (store in database or trigger alerts)
  console.log(`Received data from device ${deviceId}:`, sensorData);

  // Simulate successful ingestion
  res.status(200).json({ message: 'IoT data ingested successfully' });
};

module.exports = { ingestIoTData };