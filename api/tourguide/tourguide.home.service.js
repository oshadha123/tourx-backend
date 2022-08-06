const pool = require("../../config/database");

module.exports = {
  
  getUsers: callBack => {
    pool.query(
      `select * from guidehasleaderboard join tourguide on guidehasleaderboard.userId=tourguide.userId;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
