const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
  {
    collectionName: String,
    collectionId: mongoose.Schema.Types.ObjectId,
    diff: {
      name: [String],
      storyPoint: [Number],
      status: [String],
      sprint: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Sprint',
        },
      ],
      description: [String],
      assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: String,
    version: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = HistorySchema;
