const pool = require("../../../config/database");

module.exports = {
    getAllGuides: (callBack) => {
        pool.query(
            "SET @lastBoard = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1);SELECT tourguide.*,guidehasleaderboard.points,CASE WHEN m.endDate > NOW() THEN 'Premium' ELSE 'None-Premium' END AS 'package' FROM tourguide LEFT JOIN (SELECT tourguideaccount.*, row_number() OVER(PARTITION BY tourguideaccount.userId ORDER BY tourguideaccount.datePurchased DESC) rn FROM tourguideaccount) m ON tourguide.userId = m.userId AND m.rn = 1 INNER JOIN guidehasleaderboard ON  guidehasleaderboard.userId = tourguide.userId AND guidehasleaderboard.boardId = @lastBoard INNER JOIN login ON login.userId=tourguide.userId AND login.roleId=2 AND login.verificationStatus=1 ORDER BY CASE WHEN m.endDate > NOW() THEN 0 ELSE 1 END ASC,guidehasleaderboard.points DESC;", [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    }
}