const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  goal: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model('Sprint', SprintSchema);
