const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
// module.exports = ProjectSchema;
