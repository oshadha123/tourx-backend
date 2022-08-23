const pool = require("../../../config/database");

module.exports = {
  getTours: (userId, callBack) => {
    pool.query(
      "(SELECT tourId,tourName,description,createdTimeStamp,tourguide.firstName,tourguide.lastName FROM tour,tourguide WHERE tour.guideId=tourguide.userId AND tour.approvalStatus='y' AND tour.tourId IN (SELECT DISTINCT photo.tourId FROM photo, touristattraction, touristattractiontypeF WHERE photo.attractionId=touristattraction.attractionId AND touristattractiontypeF.attractionId=touristattraction.attractionId AND touristattractiontypeF.typeId IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?))) UNION (SELECT tourId,tourName,description,createdTimeStamp,tourguide.firstName,tourguide.lastName FROM tour,tourguide WHERE tour.guideId=tourguide.userId AND tour.approvalStatus='y' AND tour.tourId NOT IN (SELECT DISTINCT photo.tourId FROM photo, touristattraction, touristattractiontypeF WHERE photo.attractionId=touristattraction.attractionId AND touristattractiontypeF.attractionId=touristattraction.attractionId AND touristattractiontypeF.typeId IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?)))", [userId,userId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getTempTours: (callBack) => {
    pool.query(
      `select * from touristattraction join photo on touristattraction.attractionId=photo.attractionId join tour on tour.tourId=photo.tourId join village on village.villageId=touristattraction.villageId;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPhoto: (tourId,array, current, callBack, next) => {
    pool.query(
      "SELECT photo.path FROM photo WHERE photo.tourId=?", [tourId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        if(current.count==array.length){
          next(null,array)
        }
        current.count++;
        return callBack(null, results);
      }
    );
  },
  getAllTours: (callBack) => {
    pool.query(
      "SELECT * FROM tour", [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSelfFavourite: (userId, callBack) => {
    pool.query(
      "SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?", [userId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
}