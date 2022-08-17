const pool = require("../../../config/database");

module.exports = {
  getTours: (userId, callBack) => {
    pool.query(
      "(SELECT tourId,tourName,description,createdTimeStamp,tourguide.firstName,tourguide.lastName FROM tour,tourguide WHERE tour.guideId=tourguide.userId AND tour.approvalStatus='y' AND tour.tourId IN (SELECT touristattractiontypeF.attractionId FROM touristattractiontypeF WHERE touristattractiontypeF.typeId IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?) )) UNION (SELECT tourId,tourName,description,createdTimeStamp,tourguide.firstName,tourguide.lastName FROM tour,tourguide WHERE tour.guideId=tourguide.userId AND tour.approvalStatus='y' AND tour.tourId NOT IN (SELECT touristattractiontypeF.attractionId FROM touristattractiontypeF WHERE touristattractiontypeF.typeId IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?) ))", [userId,userId],
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