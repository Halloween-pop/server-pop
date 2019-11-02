const express = require('express');
const router = express.Router();

router.use('/scores', require('./scores'));
router.use('/ranks', require('./ranks'));

module.exports = router;