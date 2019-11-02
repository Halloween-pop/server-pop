const express = require('express');
const router = express.Router()

router.use('/', reuqire('./user'));

module.exports = router;