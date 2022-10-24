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
        query = "INSERT INTO `admin`(firstName,lastName,profilePicture) VALUES (?,?,?)"; 
        pool.query(query, [firstName, lastName, profilePic],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, { userId: results.insertId });
          }
        );
        break; 
      case 3:
        query = "INSERT INTO `tourist`(firstName,lastName,profilePicture) VALUES (?,?,?)";
        pool.query(query, [firstName, lastName, profilePic],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, { userId: results.insertId });
          }
        );
        break;
      case 2:
        query = "INSERT INTO `tourguide`(firstName,lastName,profilePicture) VALUES (?,?,?);SET @lastInsertId = (LAST_INSERT_ID());SET @lastBoard = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1);INSERT INTO guidehasleaderboard(userId, boardId, points) VALUES (@lastInsertId, @lastBoard, 0);SELECT @lastInsertId AS userId;";
        pool.query(query, [firstName, lastName, profilePic],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, { userId: results[0].insertId });
          }
        );
        break;
      default:
        callBack(1);
    }

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
  getVerificationOTP:(hashedEmail,otp,callBack) => {
    pool.query(
      "SELECT emailverificationcode.* FROM emailverificationcode,login WHERE emailverificationcode.userId = login.userId AND emailverificationcode.roleId = login.roleId AND login.hashEmail= ? AND emailverificationcode.authOtp = ?   AND emailverificationcode.createdDateTime >  DATE_SUB(NOW(), INTERVAL 1 DAY);"
      , [hashedEmail, otp],
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
  },
}