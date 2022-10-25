const jwt = require("jsonwebtoken");
const {
    getAllTypes, getSelfFavourite, addFavouriteType
} = require("./tourist.favouriteType.service");

module.exports = {
    getFavouriteType: (req, res) => {
        getAllTypes((err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    getMyFavouriteType: (req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            getSelfFavourite(decoded.userId, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                return res.json({
                    success: 1,
                    data: results
                });
            });
        })
    },
    addFavouriteType: (req, res) => {
        const body = req.body;
        const favouriteType = body.favouriteType
        let token = req.get("authorization");
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            var data = [];
            favouriteType.forEach((x) => {
                data.push([userId,x])
            })
            addFavouriteType(data, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                return res.json({
                    success: 1,
                    data: "Data successfully inserted."
                });
            });
        })
    }
}