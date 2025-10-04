const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  location: { type: String, required: true },
  type: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Alert', alertSchema);