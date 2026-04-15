const express = require('express');
const prizeController = require('./prizeController');

const router = express.Router();

router.get('/', prizeController.listPrizes);

module.exports = router;
