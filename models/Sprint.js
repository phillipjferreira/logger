const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  goal: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  status: {
    type: String,
    enum: ['Planned', 'Active', 'Complete'],
    default: 'Planned',
  },
});

module.exports = mongoose.model('Sprint', SprintSchema);
