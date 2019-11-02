const express = require('express');
const router = express.Router();

router.use('/', require('./imgs'));

module.exports = router;