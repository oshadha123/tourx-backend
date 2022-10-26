const pool = require("../../../config/database");

module.exports = {
    getUserStats: (callBack) => {
        pool.query(
            "(SELECT 'tourist' AS userType,DATE(tourist.createdDate) AS `date`,COUNT(tourist.userId) AS `count` FROM tourist GROUP BY tourist.createdDate) UNION (SELECT 'tourguide' AS userType,DATE(tourguide.createdDate) AS `date`,COUNT(tourguide.userId) AS `count` FROM tourguide GROUP BY tourguide.createdDate);",
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    countUsers: (callBack) => {
      pool.query(
        "SELECT COUNT(tourguide.userId) AS 'verified' FROM  tourguide,login WHERE login.verificationStatus=1 AND login.accountState=1 AND login.contactState=1 AND login.userId=tourguide.userId AND login.roleId=2;SELECT (SELECT COUNT(tourguide.userId) AS 'unverified' FROM tourguide,login WHERE login.verificationStatus=0 AND login.accountState=1 AND login.userId=tourguide.userId AND login.roleId=2) + (SELECT COUNT(tourguide.userId) AS 'unverified' FROM tourguide,login WHERE login.contactState=0 AND login.accountState=1 AND login.userId=tourguide.userId AND login.roleId=2) AS 'unverified';SELECT COUNT(tourguide.userId) AS 'deactivated' FROM  tourguide,login WHERE login.accountState=0 AND login.userId=tourguide.userId AND login.roleId=2;",
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    countAccountType: (callBack) => {
      pool.query(
        "SELECT package,COUNT(package) AS `count` FROM (SELECT CASE WHEN m.endDate > NOW() THEN 'Premium' ELSE 'NonePremium' END AS 'package' FROM tourguide LEFT JOIN (SELECT tourguideaccount.*, row_number() OVER(PARTITION BY tourguideaccount.userId ORDER BY tourguideaccount.datePurchased DESC) rn FROM tourguideaccount) m ON tourguide.userId = m.userId AND m.rn = 1 INNER JOIN login ON login.userId=tourguide.userId AND login.roleId=2 AND login.verificationStatus=1 AND login.contactState=1 AND login.accountState=1) temp GROUP BY package ORDER BY package ASC;",
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    countReportedAccount: (callBack) => {
      pool.query(
        "SET @count = (SELECT rulehandle.value FROM rulehandle WHERE rulehandle.ruleId=4 AND rulehandle.startDateTime < NOW() AND rulehandle.endDateTime > NOW() ORDER BY rulehandle.startDateTime DESC);SELECT COUNT(c) AS `count` FROM (SELECT COUNT(userId) c FROM userReporting WHERE userReporting.activeState=1 GROUP BY roleId,userId HAVING c >= @count) temp;",
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[1]);
        }
      );
    },
    countReceiveTours:(callBack) => {
      pool.query(
        "SELECT COUNT(tourId) AS `count`, approvalStatus FROM tour GROUP BY approvalStatus ORDER BY approvalStatus;",
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
}