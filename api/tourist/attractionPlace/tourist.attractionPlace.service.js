const pool = require("../../../config/database");

module.exports = {
  getAllAttraction: (userId, callBack) => {
    pool.query(
      `(SELECT touristattraction.attractionId,touristattraction.attractionName,touristattraction.longitude,touristattraction.latitude,village.villageName
        FROM touristattraction,village,touristattractiontypeF
        WHERE touristattraction.attractionId=touristattractiontypeF.attractionId AND touristattraction.villageId=village.villageId
        AND touristattractiontypeF.typeId IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?)) UNION (SELECT touristattraction.attractionId,touristattraction.attractionName,touristattraction.longitude,touristattraction.latitude,village.villageName
        FROM touristattraction,village,touristattractiontypeF
        WHERE touristattraction.attractionId=touristattractiontypeF.attractionId AND touristattraction.villageId=village.villageId
        AND touristattractiontypeF.typeId NOT IN (SELECT touristFavouriteType.typeId FROM touristFavouriteType WHERE touristFavouriteType.touristId=?));`,
      [userId,userId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPhoto: (attractionId ,array, current, callBack, next) => {
    pool.query(
      "SELECT photo.path FROM photo WHERE photo.attractionId =?", [attractionId ],
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
  }
}