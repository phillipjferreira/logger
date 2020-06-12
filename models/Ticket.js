const mongoose = require('mongoose');
const diffHistory = require('mongoose-diff-history/diffHistory');

const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  storyPoint: { type: Number, required: true },
  status: {
    type: String,
    enum: ['To-Do', 'In-Progress', 'Done'],
    default: 'To-Do',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint',
  },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

TicketSchema.plugin(diffHistory.plugin, {
  omit: ['created', 'updated', 'assignedBy', 'project'],
});

module.exports = mongoose.model('Ticket', TicketSchema);
