const pool = require("../../config/database");

module.exports = {
    getLatestPackagePrice: (callBack) => {
        pool.query(
            "SELECT rulehandle.value FROM rulehandle WHERE rulehandle.ruleId=3 AND rulehandle.startDateTime < NOW() AND rulehandle.endDateTime > NOW() ORDER BY rulehandle.startDateTime DESC;",
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
          );
    }
}