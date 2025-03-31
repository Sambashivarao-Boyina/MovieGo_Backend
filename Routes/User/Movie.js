const express = require("express");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const WrapAsync = require("../../Utils/WrapAsync");
const { getAllMoviesForBooking, getMovieDetails } = require("../../Controllers/User/Movie");
const isUser = require("../../MiddleWares/isUser");
const router = express.Router();

router.get("/", IsAutheticated, isUser, WrapAsync(getAllMoviesForBooking));
router.get("/:movieId", IsAutheticated, isUser, WrapAsync(getMovieDetails));

module.exports = router;