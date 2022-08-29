const pool = require("../../../config/database");

module.exports = {
    getAlltourist: (callBack) => {
        pool.query(
            "SELECT tourist.userId,tourist.firstName,tourist.lastName,tourist.profilePicture,DATE(tourist.createdDate) AS createdDate,TIME(tourist.createdDate) AS createdTime  FROM tourist,login WHERE tourist.userId=login.userId AND login.roleId=3 AND login.accountState=1;",
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    getAlltouristFilterBy: (field,way,callBack) => {
        pool.query(
            "SELECT tourist.userId,tourist.firstName,tourist.lastName,tourist.profilePicture,DATE(tourist.createdDate) AS createdDate,TIME(tourist.createdDate) AS createdTime  FROM tourist,login WHERE tourist.userId=login.userId AND login.roleId=3 AND login.accountState=1 ORDER BY "+field+" "+way+";",
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    getAlltourGuide: (callBack) => {
        pool.query(
            "SET @lastBoard = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1);SELECT * FROM ((SELECT tourguide.userId,tourguide.firstName,tourguide.lastName,tourguide.profilePicture,DATE(tourguide.createdDate) AS createdDate,TIME(tourguide.createdDate) AS  createdTime,guidehasleaderboard.points,CASE WHEN m.endDate > NOW() THEN 'Premium' ELSE 'None-Premium' END AS 'package' FROM tourguide LEFT JOIN (SELECT tourguideaccount.*, row_number() OVER(PARTITION BY tourguideaccount.userId ORDER BY tourguideaccount.datePurchased DESC) rn FROM tourguideaccount) m ON tourguide.userId = m.userId AND m.rn = 1 INNER JOIN guidehasleaderboard ON  guidehasleaderboard.userId = tourguide.userId AND guidehasleaderboard.boardId = @lastBoard INNER JOIN login ON login.userId=tourguide.userId AND login.roleId=2 AND login.verificationStatus=1) UNION (SELECT tourguide.userId,tourguide.firstName,tourguide.lastName,tourguide.profilePicture,DATE(tourguide.createdDate) AS createdDate,TIME(tourguide.createdDate) AS  createdTime,guidehasleaderboard.points,'None-Premium' AS 'package' FROM tourguide,guidehasleaderboard WHERE tourguide.userId=guidehasleaderboard.userId AND guidehasleaderboard.boardId=@lastBoard AND tourguide.userId NOT IN (SELECT DISTINCT tourguideaccount.userId FROM tourguideaccount))) temp GROUP BY 'package',userId ORDER BY package DESC",
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    getAlltourGuideFiltered: (field,way, callBack) => {
        pool.query(
            "SET @lastBoard = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1);SELECT * FROM ((SELECT tourguide.userId,tourguide.firstName,tourguide.lastName,tourguide.profilePicture,DATE(tourguide.createdDate) AS createdDate,TIME(tourguide.createdDate) AS  createdTime,guidehasleaderboard.points,CASE WHEN m.endDate > NOW() THEN 'Premium' ELSE 'None-Premium' END AS 'package' FROM tourguide LEFT JOIN (SELECT tourguideaccount.*, row_number() OVER(PARTITION BY tourguideaccount.userId ORDER BY tourguideaccount.datePurchased DESC) rn FROM tourguideaccount) m ON tourguide.userId = m.userId AND m.rn = 1 INNER JOIN guidehasleaderboard ON  guidehasleaderboard.userId = tourguide.userId AND guidehasleaderboard.boardId = @lastBoard INNER JOIN login ON login.userId=tourguide.userId AND login.roleId=2 AND login.verificationStatus=1) UNION (SELECT tourguide.userId,tourguide.firstName,tourguide.lastName,tourguide.profilePicture,DATE(tourguide.createdDate) AS createdDate,TIME(tourguide.createdDate) AS  createdTime,guidehasleaderboard.points,'None-Premium' AS 'package' FROM tourguide,guidehasleaderboard WHERE tourguide.userId=guidehasleaderboard.userId AND guidehasleaderboard.boardId=@lastBoard AND tourguide.userId NOT IN (SELECT DISTINCT tourguideaccount.userId FROM tourguideaccount))) temp GROUP BY 'package',userId ORDER BY package DESC, "+field+" "+way+";",
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