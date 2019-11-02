const au = require('../modules/util/authUtil');
const sc = require('../modules/util/statusCode');
const rm = require('../modules/util/responseMessage');
const pool = require('../modules/db/pool');
// const encrypt = require('../module/encryption');

const table = 'user';

module.exports = {
    signin: ({id, password}) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        return pool.queryParam_None(query)
            .then(async (userReturn) => {
                if(userReturn.length == 0) {
                    return {
                        code: sc.BAD_REQUEST,
                        json: au.successFalse(rm.NO_USER)
                    };
                }
                console.log(userReturn);
                const user = userReturn[0];
                if(user.password != password) {
                    return {
                        code: sc.BAD_REQUEST,
                        json: au.successFalse(rm.MISS_MATCH_PW)
                    };
                }
                return {
                    code: sc.OK,
                    json: au.successTrue(rm.SIGN_IN_SUCCESS)
                };
            })
            .catch (err => {
                throw err;
            });
    },

    signup: ({id, password, nickname}) => {
        const fields = 'id, password, nickname';
        const questions = `?,?,?`;
        const values = [id, password, nickname];
        return pool.queryParam_Parse(`INSERT INTO ${table}(${fields}) VALUES(${questions})`, values)
            .then(result => {
                if(result.code && result.json) return result;
                const userId = result.insertId;
                return {
                    code: sc.OK,
                    json: au.successTrue(rm.SIGN_UP_SUCCESS, userId)
                };
            })
            .catch(err => {
                if(err.errno == 1062) {
                    return {
                        code: sc.BAD_REQUEST,
                        // rm 추가 예정
                        json: au.successFalse("존재하는 아이디 및 닉네임 입니다.")
                    };
                }
                throw err;
            })
    },

    readAll: () => {
        const table = 'user';
        const query = `SELECT * FROM ${table}`
        // 쿼리하나를 보내므로 None
        return pool.queryParam_None(query)
            .then(result => {
                return {
                    code: sc.OK,
                    json: au.successTrue("회원 읽기 성공", result)
                };
            })
            .catch(err => {
                console.log(err);
                // throw로 상위 모듈로 보내준다.
                throw err;
            });
    }
}