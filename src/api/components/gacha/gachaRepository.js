const GachaHistory = require('../../../models/gachaHistory-schema');

const countTodayGacha = async (userId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return GachaHistory.countDocuments({
    userId,
    rolledAt: { $gte: startOfDay, $lte: endOfDay },
  });
};

const saveGachaResult = async ({ userId, username, prizeId, isWinner }) => {
  const record = new GachaHistory({
    userId,
    username,
    prize: prizeId || null,
    isWinner,
  });
  return record.save();
};

const getHistoryByUser = async (userId) =>
  GachaHistory.find({ userId })
    .populate('prize', 'name quota')
    .sort({ rolledAt: -1 });

const getWinnersByPrize = async () =>
  GachaHistory.find({ isWinner: true })
    .populate('prize', 'name')
    .sort({ rolledAt: -1 });

module.exports = {
  countTodayGacha,
  saveGachaResult,
  getHistoryByUser,
  getWinnersByPrize,
};
