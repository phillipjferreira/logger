const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  storyPoint: Number,
  status: {
    type: String,
    enum: ['To-Do', 'In-Progress', 'Done'],
    default: 'To-Do',
  },
  key: { type: String },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint',
  },
  description: String,
  category: String,
  tags: [String],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', TicketSchema);
