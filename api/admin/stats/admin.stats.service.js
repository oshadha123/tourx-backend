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
}