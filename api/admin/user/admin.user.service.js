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
            "SELECT tourist.userId,tourist.firstName,tourist.lastName,tourist.profilePicture,DATE(tourist.createdDate) AS createdDate,TIME(tourist.createdDate) AS createdTime  FROM tourist,login WHERE tourist.userId=login.userId AND login.roleId=3 AND login.accountState=1 ORDER BY ?;",
            [field,way],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    getAlltourGuideFiltered: (userId, callBack) => {
        pool.query(
            "",
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