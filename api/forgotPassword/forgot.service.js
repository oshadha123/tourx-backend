const pool = require("../../config/database");

module.exports = {
    getEmail:(userId, roleId, callBack) => {
        pool.query(
            "SELECT email,hashEmail FROM `login` WHERE userId= ? AND roleId=?",
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
            "SELECT * FROM `passwordresetcode` WHERE hashEmail= ? AND resetOtp = ? AND validityState='y' AND createdDateTime >  DATE_SUB(NOW(), INTERVAL 1 HOUR);",
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
    checkPassword:(userId,roleId,oldPassword,callBack) => {
        pool.query(
            "SELECT userId,roleId  FROM `login` WHERE userId= ? AND roleId = ? AND `password`= ?",
            [userId,roleId,oldPassword],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        );
    },
    updatePassword:(userId,roleId,newPassword,callBack) => {
        pool.query(
            "UPDATE `login` SET `password`=? WHERE userId  = ? AND roleId = ?",
            [newPassword,userId,roleId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        );
    }
}