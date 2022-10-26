const pool = require("../../config/database");

module.exports = {
  
  getUsers: callBack => {
    pool.query(
      `SELECT * FROM guidehasleaderboard JOIN tourguide ON guidehasleaderboard.userId=tourguide.userId AND guidehasleaderboard.boardId=(SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1) JOIN login ON tourguide.userId=login.userId AND login.roleId=2 AND login.accountState=1  AND login.contactState=1 ORDER BY guidehasleaderboard.points DESC;`,
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
      `select * from touristattraction join photo on touristattraction.attractionId=photo.attractionId join tour on tour.tourId=photo.tourId join village on village.villageId=touristattraction.villageId where tourGuideId=?;`,
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
