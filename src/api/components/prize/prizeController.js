const prizeService = require('./prizeService');

const listPrizes = async (req, res) => {
  const prizes = await prizeService.getPrizesWithRemaining();

  return res.status(200).json({
    success: true,
    message: 'Daftar hadiah berhasil diambil',
    data: prizes,
  });
};

module.exports = { listPrizes };
