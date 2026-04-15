const Prize = require('../../../models/prizeSchema');

const getAllPrizes = async () => Prize.find();

const incrementWinner = async (prizeId) =>
  Prize.findByIdAndUpdate(
    prizeId,
    { $inc: { winnersCount: 1 } },
    { new: true }
  );

module.exports = { getAllPrizes, incrementWinner };
