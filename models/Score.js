const au = require('../modules/util/authUtil');
const rm = require('../modules/util/responseMessage');
const sc = require('../modules/util/statusCode');
const pool = require('../modules/db/pool');

// global variable	
const table = 'user';

// exports
score = {
    insert: async (stage, scores, userIdx) => {
        const query = `UPDATE ${table} SET ${stage} = '${scores}' WHERE userIdx = '${userIdx}'`;
        const result = await pool.queryParam_None(query);

        // check error
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.SCORE_CREATE_FAIL)
            }
        }
        
        // stage를 모두 clear 한다면 total 값 저장.
        if (stage === 'nine') {
            let query = `SELECT one, two, three, four, five, six, seven, eight, nine from ${table} WHERE userIdx = '${userIdx}'`;

            let result = await pool.queryParam_None(query);

            // check error
            if (!result) {
                return {
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.SCORE_CREATE_FAIL)
                }
            }
            result = result[0]
            calTotal = 0
            for (let i in result) {
                calTotal += result[i]
            }
            
            query = `UPDATE ${table} SET total = '${calTotal}' WHERE userIdx = '${userIdx}'`
            result = await pool.queryParam_None(query);

            // check error
            if (!result) {
                return {
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.SCORE_CREATE_FAIL)
                }
            }

        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.SCORE_CREATE_SUCCESS, result)
        }
    },
    // 현재까지 정보를 모두 조회    // sucess
    selectAll: async (userIdx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx = ${userIdx}`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.SCORE_READ_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.SCORE_READ_SUCCESS, result)
        };
    }
}

module.exports = score;


