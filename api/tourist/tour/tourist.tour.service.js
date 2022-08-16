const pool = require("../../../config/database");

module.exports = {
  getTours: (userId, callBack) => {
    pool.query(
      "(SELECT * FROM tour WHERE tour.approvalStatus='y' AND tour.tourId IN (SELECT touristattractiontypeF.attractionId FROM touristattractiontypeF WHERE touristattractiontypeF.typeId IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?) )) UNION (SELECT * FROM tour WHERE tour.approvalStatus='y' AND tour.tourId NOT IN (SELECT touristattractiontypeF.attractionId FROM touristattractiontypeF WHERE touristattractiontypeF.typeId IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?) ))", [userId,userId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPhoto: (tourId, callBack) => {

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
  getPhoto: (tourId, callBack) => {
    pool.query(
      "SELECT photoId, path FROM `photo` WHERE tourId=?",
      [tourId],
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