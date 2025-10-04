const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: { type: [String], required: true },
  demographics: { type: Object, required: true },
  location: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  labUpload: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);