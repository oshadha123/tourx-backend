const pool = require("../../config/database");

module.exports = {
  
  getUsers: callBack => {
    pool.query(
      `SELECT * FROM guidehasleaderboard JOIN tourguide ON guidehasleaderboard.userId=tourguide.userId AND guidehasleaderboard.boardId=(SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1) ORDER BY guidehasleaderboard.points DESC;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getYourToursDetails: (tourGuideId,callBack) => {
    pool.query(
      `select * from touristattraction join photo on touristattraction.attractionId=photo.attractionId where tourGuideId=?;`,
      [tourGuideId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

};
