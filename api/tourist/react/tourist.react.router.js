const router = require("express").Router();

const {reactAPost,unReactPost} = require("./tourist.react.controller");

router.post("/react/add", reactAPost);
router.delete("/react/remove", unReactPost)

module.exports = router;