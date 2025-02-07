const { createMovie, getAllAdminMovies, deleteAdminMovie } = require("../../Controllers/Admin/Movies");
const isAdmin = require("../../MiddleWares/isAdmin");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const { validateMovie } = require("../../Utils/Validatations");
const WrapAsync = require("../../Utils/WrapAsync");

const router = require("express").Router();

router.post("/", IsAutheticated, isAdmin, validateMovie, WrapAsync(createMovie));
router.get("/", IsAutheticated, isAdmin, WrapAsync(getAllAdminMovies));
router.delete("/:movieId", IsAutheticated, isAdmin, WrapAsync(deleteAdminMovie));

module.exports = router;