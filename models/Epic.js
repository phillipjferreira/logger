const mongoose = require('mongoose');

const EpicSchema = new mongoose.Schema({
  name: String,
  key: String,
  description: String,
  category: String,
  tags: [String],
  startDate: Date,
  endDate: Date,
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created: Date,
  updated: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model('Epic', EpicSchema);
