const pool = require("../../../config/database");

module.exports = {
    getReportedUsers:(callBack) => {
        pool.query(
            "SET @count = (SELECT rulehandle.value FROM rulehandle WHERE rulehandle.ruleId=4 AND rulehandle.startDateTime < NOW() AND rulehandle.endDateTime > NOW() ORDER BY rulehandle.startDateTime DESC);SELECT * FROM tourguide WHERE tourguide.userId IN (SELECT DISTINCT userReporting.userId FROM userReporting WHERE userReporting.activeState=1 AND userReporting.roleId=2 GROUP BY roleId,userId HAVING COUNT(recordId) >= @count);",
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          ); 
    },
    getUserReportedById:(userId, callBack) => {
        pool.query(
            "SELECT userReporting.reportedDate, userReporting.activeState,CASE WHEN userReporting.reason=1 THEN 'Harassment or Bulling' WHEN userReporting.reason=2 THEN 'Wrong information provided' WHEN userReporting.reason=3 THEN 'Pretending be someone else' END AS `reason`, userReporting.description, userReporting.checkedDate FROM userReporting WHERE userReporting.userId = ? AND userReporting.roleId = 2 ORDER BY userReporting.reportedDate DESC;",
            [userId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        ); 
    },
    addContactToBannedList:(userId, callBack) => {
        pool.query(
            "SET @contact = (SELECT usercontact.contactNumber FROM usercontact WHERE usercontact.userId=? AND usercontact.roleId=2);INSERT IGNORE INTO banned_telephone_numbers VALUES (@contact);UPDATE login SET login.accountState = 2 WHERE login.userId = ?  AND login.roleId=2;UPDATE userReporting SET userReporting.checkedDate=CURRENT_TIMESTAMP, userReporting.activeState=0 WHERE userReporting.userId=? AND userReporting.checkedDate IS NULL",
            [userId,userId,userId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    freeUser:(userId, callBack) => {
        pool.query(
            "UPDATE userReporting SET userReporting.checkedDate=CURRENT_TIMESTAMP, userReporting.activeState=0 WHERE userReporting.userId=? AND userReporting.checkedDate IS NULL",
            [userId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    }
}