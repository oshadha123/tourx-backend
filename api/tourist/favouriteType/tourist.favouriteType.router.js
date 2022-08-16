const router = require("express").Router();

const {getFavouriteType,getMyFavouriteType,addFavouriteType} = require("./tourist.favouriteType.controller");

router.get("/favourite", getFavouriteType);
router.get("/favourite/self", getMyFavouriteType);
router.post("/favourite", addFavouriteType);

module.exports = router;