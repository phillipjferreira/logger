const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' },
  sprint: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' },
  description: String,
  category: String,
  storyPoint: Number,
  tags: [String],
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created: Date,
  updated: Date
});

module.exports = mongoose.model('Ticket', TicketSchema);
