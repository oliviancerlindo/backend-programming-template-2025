const mongoose = require('mongoose');

const gachaHistorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    prize: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prize',
      default: null,
    },
    isWinner: { type: Boolean, default: false },
    rolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GachaHistory', gachaHistorySchema);
