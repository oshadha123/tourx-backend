const pool = require("../../config/database");

module.exports = {
  searchDbForEmailPassword: (email , password, callBack) => {
    pool.query(
      "SELECT userId,roleId,verificationStatus,accountState FROM `login` WHERE hashEmail= ? AND `password`= ? ",
      [email,password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserDetails: (userId , roleId, callBack) => {
    var query ="";
    switch(roleId){
      case 1:
        query = "SELECT * FROM `admin` WHERE admin.userId = ?";
        pool.query(
          query,
          [userId],
          (error, results, fields) => {
            console.log(error);
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
        break;
      case 2:
        query = "(SELECT tourguide.*,guidehasleaderboard.points,CASE WHEN m.endDate > NOW() THEN 'Premium' ELSE 'None-Premium' END AS 'package' FROM tourguide LEFT JOIN (SELECT tourguideaccount.*, row_number() OVER(PARTITION BY tourguideaccount.userId ORDER BY tourguideaccount.datePurchased DESC) rn FROM tourguideaccount  WHERE tourguideaccount.userId=?) m ON tourguide.userId = m.userId AND m.rn = 1 AND m.userId=? INNER JOIN guidehasleaderboard ON  guidehasleaderboard.userId = tourguide.userId AND guidehasleaderboard.boardId = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1) AND guidehasleaderboard.userId=? )UNION (SELECT tourguide.*,guidehasleaderboard.points,'None-Premium' AS 'package' FROM tourguide INNER JOIN guidehasleaderboard ON  guidehasleaderboard.userId = tourguide.userId AND guidehasleaderboard.boardId = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1) AND guidehasleaderboard.userId=? AND tourguide.userId NOT IN (SELECT DISTINCT tourguideaccount.userId FROM tourguideaccount));";
        pool.query(
          query,
          [userId,userId,userId,userId],
          (error, results, fields) => {
            console.log(error);
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
        break;
      case 3:
        query = "SELECT * FROM `tourist` WHERE tourist.userId = ?";
        pool.query(
          query,
          [userId],
          (error, results, fields) => {
            console.log(error);
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
        break;
      default:
        return
    }
  },
  getUserContact: (userId , roleId,results, callBack) => {
    pool.query(
      "SELECT * FROM `usercontact` WHERE userId=? AND roleId=?",
      [userId,roleId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};