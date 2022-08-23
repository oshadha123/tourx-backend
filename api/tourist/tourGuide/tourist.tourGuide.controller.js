const {
    getAllGuides
} = require("./tourist.tourGuide.service");

module.exports = {
    getTourGuide: (req, res) => {
        getAllGuides((err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            results.shift();
            var data = []
            results[0].forEach(element => {
                data.push(element)
            });
            return res.json({
                success: 1,
                data: data
            });
        })
    }
}