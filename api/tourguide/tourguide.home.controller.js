const {
    
    getUsers,
    getYourToursDetails
  } = require("./tourguide.home.service");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    getLeaderboard: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getYourTours: (req, res) => {
    const body = req.body;
    getYourToursDetails(body.userId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      
        return res.json({
          success: 1,
          data:results
        });
      
    });
  },
  };
  