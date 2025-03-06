const express = require("express");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isAdmin = require("../../MiddleWares/isAdmin");
const WrapAsync = require("../../Utils/WrapAsync");
const { createNewTheater, getAllTheatersOfAdmin, getAllTheatersDetailsOfAdmin, getTheaterDetails } = require("../../Controllers/Admin/Theater");
const { validateTheater } = require("../../Utils/Validatations");
const router = express.Router();


router.post("/", IsAutheticated, isAdmin, validateTheater, WrapAsync(createNewTheater));
router.get("/", IsAutheticated, isAdmin, WrapAsync(getAllTheatersOfAdmin));
router.get("/:theaterId", IsAutheticated, isAdmin, WrapAsync(getTheaterDetails))

module.exports = router;