const Prize = require('../models/prizeSchema');

const PRIZES = [
  { name: 'Emas 10 gram', quota: 1, weight: 1 },
  { name: 'Smartphone X', quota: 5, weight: 5 },
  { name: 'Smartwatch Y', quota: 10, weight: 10 },
  { name: 'Voucher Rp100.000', quota: 100, weight: 100 },
  { name: 'Pulsa Rp50.000', quota: 500, weight: 500 },
];

const seedPrizes = async () => {
  const count = await Prize.countDocuments();
  if (count === 0) {
    await Prize.insertMany(PRIZES.map((p) => ({ ...p, winnersCount: 0 })));
    console.log('Prizes seeded successfully');
  }
};

module.exports = { seedPrizes };
