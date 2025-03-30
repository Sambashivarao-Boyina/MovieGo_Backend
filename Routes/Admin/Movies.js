const express = require("express");
const { createMovie, getAllAdminMovies, deleteAdminMovie, getMovieDetails } = require("../../Controllers/Admin/Movies");
const isAdmin = require("../../MiddleWares/isAdmin");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const WrapAsync = require("../../Utils/WrapAsync");
const router = express.Router();

router.post(
  "/:movieName",
  IsAutheticated,
  isAdmin,
  WrapAsync(createMovie)
);
router.get("/", IsAutheticated, isAdmin, WrapAsync(getAllAdminMovies));
router.delete("/:movieId", IsAutheticated, isAdmin, WrapAsync(deleteAdminMovie));
router.get("/:movieId", IsAutheticated, isAdmin, WrapAsync(getMovieDetails));

module.exports = router;