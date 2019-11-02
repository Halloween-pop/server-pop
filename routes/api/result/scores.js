const express = require('express');
const router = express.Router();
const au = require('../../../modules/util/authUtil');
const rm = require('../../../modules/util/responseMessage');
const sc = require('../../../modules/util/statusCode');
const Score = require('../../../models/Score');

router.put('/:userIdx', async (req, res) => {
    // const userIdx = req.session.userIdx;    // session
    const {stage, scores} = req.body;
    const userIdx = req.params.userIdx;
    console.log(scores)
    console.log(userIdx);
    
    // TODO 1: blogName 값 확인하기
    if (!stage || !score ) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 작성하기
    try {
        const {code, json} = await Score.insert(stage, scores, userIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.SCORE_CREATE_FAIL));
    }
});

// READ_ALL
router.get('/:userIdx', async (req, res) => {
    const {userIdx} = req.params;

    // TODO 1: 읽어오기
    try {
        const {code, json} = await Score.selectAll(userIdx);
        res.status(code).send(json);
        
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.SCORE_READ_FAIL));
    }
});


module.exports = router;