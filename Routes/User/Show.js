const express = require("express");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isUser = require("../../MiddleWares/isUser");
const WrapAsync = require("../../Utils/WrapAsync");
const { getMovieShows } = require("../../Controllers/User/Show");
const router = express.Router();

router.get("/:movieId", IsAutheticated, isUser, WrapAsync(getMovieShows));

module.exports = router;