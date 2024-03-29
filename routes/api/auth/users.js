const express = require('express');
const router = express.Router();
const au = require('../../../modules/util/authUtil');
const sc = require('../../../modules/util/statusCode');
const rm = require('../../../modules/util/responseMessage');
const encrypt = require('../../../modules/util/encryption');
const User = require('../../../models/User');

router.get('/read', (req, res) => {
    User.readAll()
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR)
        .send(au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

router.post('/signup', (req, res) => {
    const {id, password, nickname} = req.body;
    if(!id || !password || !nickname) {
        const miss = Object.entries({id, password, nickname})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');

        res.status(sc.BAD_REQUEST)
        .send(au.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`));
        return;
    }
    encrypt.encrypt(password)
    .then(({hashed, salt}) => User.signup({id, nickname, salt, password: hashed}))
    .then(({code, json}) => res.status(code).send(json))
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR))
    });

    // User.signup({id, password, nickname})
    // .then(({code, json}) => {
    //     res.status(code).send(json);
    // })
    // .catch(err => {
    //     res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR))
    // });
});

router.post('/signin', (req, res) => {
    const {id, password} = req.body;
    if(!id || !password) {
        const miss = Object.entries({id, password})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');

        res.status(sc.BAD_REQUEST)
        .send(au.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`));
        return;
    }   
    User.signin({id, password})
    .then(({code, json})=> {
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err)
        res.status(sc.INTERNAL_SERVER_ERROR)
        .send(au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;