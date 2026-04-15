const prizeRepository = require('./prizeRepository');

const getPrizesWithRemaining = async () => {
  const prizes = await prizeRepository.getAllPrizes();

  return prizes.map((p) => ({
    prizeName: p.name,
    totalQuota: p.quota,
    claimed: p.winnersCount,
    remaining: p.quota - p.winnersCount,
  }));
};

module.exports = { getPrizesWithRemaining };
