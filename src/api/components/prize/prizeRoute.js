const express = require('express');
const prizeController = require('./prizeController');

const router = express.Router();

// GET /api/prizes — daftar hadiah + kuota tersisa (Bonus 2)
router.get('/', prizeController.listPrizes);

module.exports = router;
