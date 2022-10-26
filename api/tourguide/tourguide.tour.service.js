const pool = require("../../config/database");

module.exports = {
    addTour:(guideId,tourName,description,cost,days,nights,start,destination,vrUrl,path,attractionId,callBack)=>{
        pool.query(
          "INSERT INTO tour(tourName,description,cost,days,nights,start,destination,vrUrl,guideId) VALUES (?,?,?,?,?,?,?,?,?);SET @lastInsertId = (LAST_INSERT_ID());INSERT INTO photo(path,tourGuideId,attractionId,tourId,userFlag,photoFlag) VALUES (?,?,?,@lastInsertId,0,0);SELECT @lastInsertId AS tourId;",
          [tourName,description,cost,days,nights,start,destination,vrUrl,guideId,path,guideId,attractionId],
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
    },
    addAttractionPlace:(attractionName,longitude,latitude,villageId,callBack)=>{
      pool.query(
        "INSERT INTO touristattraction(attractionName,longitude,latitude,villageId) VALUES (?,?,?,?);SELECT LAST_INSERT_ID() AS attractionId;", 
        [attractionName,longitude,latitude,villageId],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, 1);
        }
      );
    }
}