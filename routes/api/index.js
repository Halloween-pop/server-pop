const express = require('express');
const router = express.Router()

router.use('/auth', reuqire('./auth'));
router.use('/img', require('./img'));
router.use('/result', require('./result'));

module.exports = router;