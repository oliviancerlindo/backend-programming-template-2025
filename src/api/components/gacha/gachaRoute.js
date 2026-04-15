const express = require('express');
const gachaController = require('./gachaController');

const router = express.Router();

router.post('/', gachaController.doGacha);

router.get('/history/:userId', gachaController.getHistory);

router.get('/winners', gachaController.getWinners);

module.exports = router;
