const express = require('express');
const gachaRoute = require('./components/gacha/gachaRoute');
const prizeRoute = require('./components/prize/prizeRoute');

const router = express.Router();

router.use('/gacha', gachaRoute);
router.use('/prizes', prizeRoute);

module.exports = router;
