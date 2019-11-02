const express = require('express');
const router = express.Router();


router.use('/auth', require('./auth'));
router.use('/imgs', require('./imgs'));
router.use('/result', require('./result'));

module.exports = router;