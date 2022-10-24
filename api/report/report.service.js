const pool = require("../../config/database");

module.exports = {
    checkUserId:(userId, table,callBack)=>{
        pool.query(
            "SELECT * FROM "+table+" WHERE userId = ?",
            [userId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    reportUser: (userId,roleId,reason,callBack) => {
        pool.query(
            "INSERT INTO userReporting(userId,roleId,reason) VALUES (?,?,?)",
            [userId,roleId,reason],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}