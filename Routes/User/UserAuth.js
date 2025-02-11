const express = require("express");
const { validateUser } = require("../../Utils/Validatations");
const WrapAsync = require("../../Utils/WrapAsync");
const { userSignUp, userLogin, userRefreshToken } = require("../../Controllers/User/UserAuth");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isUser = require("../../MiddleWares/isUser");
const router = express.Router()

router.post("/signup", validateUser, WrapAsync(userSignUp));
router.post("/login", WrapAsync(userLogin));
router.get("/refreshtoken", IsAutheticated, isUser, WrapAsync(userRefreshToken));


module.exports = router;