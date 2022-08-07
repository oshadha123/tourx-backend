const pool = require("../../config/database");

module.exports = {
    getEmail:(userId, roleId, callBack) => {
        pool.query(
            "SELECT email FROM `login` WHERE userId= ? AND roleId=?",
            [userId,roleId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
        );
    },
    searchEmail:(hashedEmail, callBack) => {
        pool.query(
            "SELECT userId,roleId FROM `login` WHERE hashEmail= ?",
            [hashedEmail],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
        );
    },
    addRecord:(hashedEmail, otp, callBack) => {
        pool.query(
            "INSERT INTO `passwordresetcode`(hashEmail,resetOtp) VALUES (?,?)",
            [hashedEmail,otp],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, 1);
            }
        );
    },
    getOtp:(hashedEmail, otp, callBack) => {
        pool.query(
            "SELECT * FROM `passwordresetcode` WHERE hashEmail= ? AND resetOtp = ? AND validityState='y'",
            [hashedEmail,otp],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
        );
    },
    updateValidity:(recordId,callBack) => {
        pool.query(
            "UPDATE `passwordresetcode` SET validityState='n' WHERE recordId = ?",
            [recordId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, 1);
            }
        );
    },
    updatePassword:(userId,roleId,callBack) => {

    }
}