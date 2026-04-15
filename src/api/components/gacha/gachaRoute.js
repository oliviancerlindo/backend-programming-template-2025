const express = require('express');
const gachaController = require('./gachaController');

const router = express.Router();

// POST /api/gacha — lakukan gacha
router.post('/', gachaController.doGacha);

// GET /api/gacha/history/:userId — riwayat gacha user (Bonus 1)
router.get('/history/:userId', gachaController.getHistory);

// GET /api/gacha/winners — daftar pemenang dengan nama disamarkan (Bonus 3)
router.get('/winners', gachaController.getWinners);

module.exports = router;
