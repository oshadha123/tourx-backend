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
