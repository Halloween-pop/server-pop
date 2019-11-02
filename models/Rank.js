const au = require('../modules/util/authUtil');
const rm = require('../modules/util/responseMessage');
const sc = require('../modules/util/statusCode');

const pool = require('../modules/db/pool');

// global variable	
const table = 'user';

// exports
rank = {
    selectAll: async () => {
        const query = `SELECT id, total FROM ${table} WHERE total > 0 ORDER BY total ASC LIMIT 10`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_READ_ALL_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: result
        };
    }
}

module.exports = rank;


