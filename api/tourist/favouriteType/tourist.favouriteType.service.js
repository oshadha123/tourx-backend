const pool = require("../../../config/database");

module.exports = {
  getAllTypes: (callBack) => {
    pool.query(
      "SELECT * FROM `favouriteType` ORDER BY typeName", [],
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
      "SELECT favouriteType.typeId,favouriteType.typeName FROM touristFavouriteType, favouriteType WHERE favouriteType.typeId= touristFavouriteType.typeId AND touristFavouriteType.touristId=? ORDER BY favouriteType.typeName", [userId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addFavouriteType: (data, callBack) => {
    pool.query(
      "INSERT IGNORE  INTO touristFavouriteType VALUES ?;", [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, 1);
      }
    );
  }
}