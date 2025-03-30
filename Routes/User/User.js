const express = require("express");
const router = express.Router();
const isAutheticated = require("../../MiddleWares/IsAutheticated");
const isUser = require("../../MiddleWares/isUser");
const WrapAsync = require("../../Utils/WrapAsync");
const {
  getuserDetails,
  changePassword,
  changePhoneNumber,
} = require("../../Controllers/User/User");

router.get("/", isAutheticated, isUser, WrapAsync(getuserDetails));
router.patch(
  "/phoneNumber",
  isAutheticated,
  isUser,
  WrapAsync(changePhoneNumber)
);
router.patch("/password", isAutheticated, isUser, WrapAsync(changePassword));

module.exports = router;
