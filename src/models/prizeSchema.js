const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quota: { type: Number, required: true },
    winnersCount: { type: Number, default: 0 },
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prize', prizeSchema);
