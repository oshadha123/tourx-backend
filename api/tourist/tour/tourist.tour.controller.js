const jwt = require("jsonwebtoken");
const {
    getTours, getPhoto, getTempTours, getTourForAttraction
} = require("./tourist.tour.service");

module.exports = {
    // getTours: (req, res) => {
    //     let token = req.get("authorization");
    //     token = token.slice(7);
    //     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    //         const userId = decoded.userId
    //         getTours(userId, (err, results) => {
    //             if (err) {
    //                 console.log(err);
    //                 return res.json({
    //                     success: 0,
    //                     data: "error, something went wrong."
    //                 });
    //             }
    //             if (!results) {
    //                 return res.json({
    //                     success: 0,
    //                     data: "error, something went wrong."
    //                 });
    //             }
    //             var itemsProcessed = {count:1};
    //             results.forEach((item, index, results) => {
    //                 console.log(item)
    //                 getPhoto(item.tourId, results, itemsProcessed, (err, result) => {
    //                     if (err) {
    //                         console.log(err);
    //                     }
    //                     if (!result) {
    //                         return res.json({
    //                             success: 0,
    //                             data: "error, something went wrong."
    //                         });
    //                     }
    //                     results[index].coverPhoto = result[0].path
    //                 },(err, results) => {
    //                     return res.json(results)
    //                 });
    //             });
    //         });
    //     })
    // },
    getTours: (req, res) => {
        getTempTours((err, results) => {
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
    getToursByLocation: (req, res) => {
        return res.json({
            success: 0,
            data: "teet 2"
        });
    },
    getToursByAttraction: (req, res) => {
        const id = req.params.attractionId;
        if (Number.isInteger(id)) {
            return res.json({
                success: 0,
                data: "Error,Wrong type of attraction id."
            });
        }
        getTourForAttraction(id, (err, results) => {
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
    }
}