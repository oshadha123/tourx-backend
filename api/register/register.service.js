const pool = require("../../config/database");

module.exports = {
  checkExistenceOfEmail: (email, callBack) => {
    pool.query(
      "SELECT userId FROM `login` WHERE hashEmail= ?",
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  addNewUser: (firstName, lastName, profilePic, roleId, callBack) => {
    var query = "";
    switch (roleId) {
      case 1:
        query = "INSERT INTO `admin`(firstName,lastName,profilePicture) VALUES (?,?,?)"; break;
      case 3:
        query = "INSERT INTO `tourist`(firstName,lastName,profilePicture) VALUES (?,?,?)"; break;
      case 2:
        query = "INSERT INTO `tourguide`(firstName,lastName,profilePicture) VALUES (?,?,?)"; break;
      default:
        callBack(error);
    }
    pool.query(query, [firstName, lastName, profilePic],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, { userId: results.insertId });
      }
    );
  },
  saveOtp: (userId, roleId, otp, callBack) => {
    pool.query(
      "INSERT INTO `emailverificationcode`(userId, roleId, authOtp) VALUES (?,?,?)"
      , [userId, roleId, otp],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, 1);
      }
    );
  },
  updateLoginDetails: (userId, roleId, email, hashEmail, password, verificationStatus, callBack) => {
    pool.query(
      "INSERT INTO `login` VALUES (?,?,?,?,?,?)"
      , [userId, roleId, email, hashEmail, password, verificationStatus],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, 1);
      }
    );
  },
  getVerificationOTP:(userId,roleId,otp,callBack) => {
    pool.query(
      "SELECT * FROM emailverificationcode WHERE emailverificationcode.userId = ? AND emailverificationcode.roleId = ? AND emailverificationcode.authOtp = ?   AND emailverificationcode.createdDateTime >  DATE_SUB(NOW(), INTERVAL 1 DAY);"
      , [userId, roleId, otp],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateVerificationStatus: (userId, roleId, callBack) => {
    pool.query(
      "UPDATE `login` SET verificationStatus=1 WHERE userId = ? AND roleId = ?;UPDATE `emailverificationcode` SET validityState='n' WHERE userId = ? AND roleId = ?;"
      , [userId, roleId,userId, roleId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
}