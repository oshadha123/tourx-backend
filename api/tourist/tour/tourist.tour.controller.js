const jwt = require("jsonwebtoken");
const {
    getTours, getAllTours
} = require("./tourist.tour.service");

module.exports = {
    getTours: (req, res) => {
        let token = req.get("authorization");
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            getTours(userId, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                return res.json(results)
            });
        })
    },
    getToursByLocation: (req, res) => {
        return res.json({
            success: 0,
            data: "teet 2"
        });
    }
}