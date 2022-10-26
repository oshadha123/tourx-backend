const pool = require("../../config/database");

module.exports = {
    checkIfReact:(userId,tourId,callBack)=>{
        pool.query(
            "SELECT * FROM react WHERE react.userId = ? AND react.tourId= ?;",
            [userId,tourId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        );
    },
    reactPost:(userId,tourId,callBack)=>{
        pool.query(
            "INSERT INTO react(userId,tourId) VALUES (?,?);SET @point = (SELECT rulehandle.value FROM rulehandle WHERE rulehandle.ruleId=5 AND rulehandle.startDateTime < NOW() AND rulehandle.endDateTime > NOW() ORDER BY rulehandle.startDateTime DESC);SET @leaderBoard = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1 );SET @tourGuide = (SELECT tour.guideId FROM tour WHERE tour.tourId=?);UPDATE guidehasleaderboard SET guidehasleaderboard.points = (guidehasleaderboard.points + @point) WHERE guidehasleaderboard.boardId=@leaderBoard AND guidehasleaderboard.userId= @tourGuide;",
            [userId,tourId,tourId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        );
    },
    removeReact:(callBack)=>{
        pool.query(
            "DELETE FROM react WHERE react.userId = ? AND react.tourId =?;SET @tourGuide = (SELECT tour.guideId FROM tour WHERE tour.tourId=?);SET @point = (SELECT rulehandle.value FROM rulehandle WHERE rulehandle.ruleId=5 AND rulehandle.startDateTime < NOW() AND rulehandle.endDateTime > NOW() ORDER BY rulehandle.startDateTime DESC);SET @leaderBoard = (SELECT guideleaderboard.boardId FROM guideleaderboard ORDER BY guideleaderboard.startingDate DESC LIMIT 1 );UPDATE guidehasleaderboard SET guidehasleaderboard.points = (guidehasleaderboard.points - @point) WHERE guidehasleaderboard.boardId=@leaderBoard AND guidehasleaderboard.userId= @tourGuide;",
            [userId,tourId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        );
    }
}