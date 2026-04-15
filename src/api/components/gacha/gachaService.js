const gachaRepository = require('./gachaRepository');
const prizeRepository = require('../prize/prizeRepository');

const MAX_DAILY_GACHA = 5;

const rollGacha = (prizes) => {
  // Hanya hadiah yang kuotanya belum habis
  const available = prizes.filter((p) => p.winnersCount < p.quota);

  const totalPrizeWeight = available.reduce((sum, p) => sum + p.weight, 0);

  // Bobot "tidak menang" = 2x total bobot hadiah (~33% chance menang)
  const noPrizeWeight = totalPrizeWeight * 2;
  const totalWeight = totalPrizeWeight + noPrizeWeight;

  const rand = Math.random() * totalWeight;

  let cumulative = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const prize of available) {
    cumulative += prize.weight;
    if (rand < cumulative) return prize;
  }

  return null; // tidak menang
};

const maskName = (name) => {
  if (!name) return '***';
  const parts = name.trim().split(' ');
  return parts
    .map((part) => {
      if (part.length <= 1) return part;
      const arr = part.split('');
      for (let i = 1; i < arr.length - 1; i += 1) {
        if (i % 2 === 1) arr[i] = '*';
      }
      return arr.join('');
    })
    .join(' ');
};

const performGacha = async ({ userId, username }) => {
  const todayCount = await gachaRepository.countTodayGacha(userId);
  if (todayCount >= MAX_DAILY_GACHA) {
    const error = new Error(
      `Kamu sudah mencapai batas ${MAX_DAILY_GACHA} kali gacha hari ini. Coba lagi besok!!!`
    );
    error.statusCode = 429;
    throw error;
  }

  const prizes = await prizeRepository.getAllPrizes();
  const wonPrize = rollGacha(prizes);

  const winningPrizeId = wonPrize ? wonPrize._id || wonPrize.id : null;

  if (wonPrize && winningPrizeId) {
    await prizeRepository.incrementWinner(winningPrizeId);
  }

  await gachaRepository.saveGachaResult({
    userId,
    username,
    prizeId: winningPrizeId,
    isWinner: !!wonPrize,
  });

  return {
    isWinner: !!wonPrize,
    prize: wonPrize ? { name: wonPrize.name } : null,
    remainingToday: MAX_DAILY_GACHA - todayCount - 1,
  };
};

const getGachaHistory = async (userId) => {
  const history = await gachaRepository.getHistoryByUser(userId);
  return history.map((h) => ({
    rolledAt: h.rolledAt,
    isWinner: h.isWinner,
    prize: h.prize ? h.prize.name : null,
  }));
};

const getWinnersByPrize = async () => {
  const winners = await gachaRepository.getWinnersByPrize();

  const grouped = {};
  winners.forEach((w) => {
    const prizeName = w.prize ? w.prize.name : 'Unknown';
    if (!grouped[prizeName]) grouped[prizeName] = [];
    grouped[prizeName].push(
      `(${grouped[prizeName].length + 1}) ${maskName(w.username)}`
    );
  });

  return grouped;
};

module.exports = { performGacha, getGachaHistory, getWinnersByPrize };
