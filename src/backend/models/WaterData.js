const mongoose = require('mongoose');

const waterDataSchema = new mongoose.Schema({
  source: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  pH: { type: Number, required: true },
  turbidity: { type: Number, required: true },
  contaminants: { type: [String], required: true },
});

module.exports = mongoose.model('WaterData', waterDataSchema);