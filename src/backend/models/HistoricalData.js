const mongoose = require('mongoose');

const historicalDataSchema = new mongoose.Schema({
  location: { type: String, required: true },
  timestamp: { type: Date, required: true },
  data: { type: Object, required: true },
});

module.exports = mongoose.model('HistoricalData', historicalDataSchema);