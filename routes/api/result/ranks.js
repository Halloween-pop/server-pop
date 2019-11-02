const express = require('express');
const router = express.Router();

const au = require('../../../modules/util/authUtil');
const rm = require('../../../modules/util/responseMessage');
const sc = require('../../../modules/util/statusCode');

const Rank = require('../../../models/Rank');

router.get('/', async (req, res) => {
    // TODO 1: 읽어오기
    try {
        const {code, json} = await Rank.selectAll();
        res.status(code).send(json);
        
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.SCORE_READ_FAIL));
    }
});

module.exports = router;