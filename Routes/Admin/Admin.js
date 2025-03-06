const express = require("express");
const router = express.Router();
const isAutheticated = require("../../MiddleWares/IsAutheticated");
const isAdmin = require("../../MiddleWares/isAdmin");
const WrapAsync = require("../../Utils/WrapAsync");
const { getAdminDetails, changePhoneNumber, changePassword } = require("../../Controllers/Admin/Admin");

router.get("/", isAutheticated, isAdmin, WrapAsync(getAdminDetails));
router.patch("/phoneNumber", isAutheticated, isAdmin, WrapAsync(changePhoneNumber));
router.patch("/password", isAutheticated, isAdmin, WrapAsync(changePassword));

module.exports = router;