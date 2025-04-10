const express = require("express");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isUser = require("../../MiddleWares/isUser");
const WrapAsync = require("../../Utils/WrapAsync");
const { getMovieShows, getShowDetails } = require("../../Controllers/User/Show");
const router = express.Router();

router.get("/:movieId", IsAutheticated, isUser, WrapAsync(getMovieShows));
router.get("/:showId/details", IsAutheticated, isUser, WrapAsync(getShowDetails));

module.exports = router;