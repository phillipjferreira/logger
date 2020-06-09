const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
