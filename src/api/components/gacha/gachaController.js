const gachaService = require('./gachaService');

const doGacha = async (req, res) => {
  const { userId, username } = req.body;

  if (!userId || !username) {
    return res.status(400).json({
      success: false,
      message: 'userId dan username wajib diisi.',
    });
  }

  const result = await gachaService.performGacha({ userId, username });

  return res.status(200).json({
    success: true,
    message: 'Gacha berhasil',
    data: {
      isWinner: result.isWinner,
      prizeName: result.prize ? result.prize.name : null,
      remainingToday: result.remainingToday,
    },
  });
};

const getHistory = async (req, res) => {
  const { userId } = req.params;
  const history = await gachaService.getGachaHistory(userId);

  return res.status(200).json({
    success: true,
    message: 'Riwayat gacha berhasil diambil',
    data: history,
  });
};

const getWinners = async (req, res) => {
  const winners = await gachaService.getWinnersByPrize();

  return res.status(200).json({
    success: true,
    message: 'Daftar pemenang berhasil diambil',
    data: winners,
  });
};

module.exports = { doGacha, getHistory, getWinners };
