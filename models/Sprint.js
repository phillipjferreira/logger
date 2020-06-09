const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  goal: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  status: {
    type: String,
    enum: ['Planned', 'Active', 'Complete'],
    default: 'Planned',
  },
});

module.exports = mongoose.model('Sprint', SprintSchema);
