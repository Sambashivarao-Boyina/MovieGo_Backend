const express = require("express");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isAdmin = require("../../MiddleWares/isAdmin");
const WrapAsync = require("../../Utils/WrapAsync");
const { getBookingsOfShow } = require("../../Controllers/Admin/Booking");
const router = express.Router();

router.get("/:showId", IsAutheticated, isAdmin, WrapAsync(getBookingsOfShow));

module.exports = router;
