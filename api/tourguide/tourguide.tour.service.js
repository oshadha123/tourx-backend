const pool = require("../../config/database");

module.exports = {
    addTour:(guideId,tourName,description,cost,days,nights,start,destination,vrUrl,callBack)=>{
        pool.query(
          "INSER INTO tour(tourName,description,cost,days,nights,start,destination,vrUrl,guideId) VALUES (?,?,?,?,?,?,?,?,?);SET @lastInsertId = (LAST_INSERT_ID());SELECT @lastInsertId AS tourId;",
          [tourName,description,cost,days,nights,start,destination,vrUrl,guideId],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    updateHidden:(tourId,path,callBack)=>{
        pool.query(
            "UPDATE tour SET hiddenPathFlag=1 WHERE tour.tourId= ? ;INSERT INTO hiddenPath VALUES(?,?);",
            [tourId,tourId,path],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    updateAttractionType:(data, callBack) => {
        pool.query(
            "INSERT IGNORE  INTO touristattractiontypeF VALUES ?;", [data],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, 1);
            }
          );
    }
}