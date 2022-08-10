module.exports = {
    getTours:(req, res) => {
        return res.json({
            success: 0,
            data: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        });
    },
    getToursByLocation:(req, res) => {
        return res.json({
            success: 0,
            data: "teet 2"
        });
    }
}