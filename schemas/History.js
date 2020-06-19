const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
  {
    collectionName: String,
    collectionId: mongoose.Schema.Types.ObjectId,
    diff: {},
    user: {},
    reason: String,
    version: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = HistorySchema;
