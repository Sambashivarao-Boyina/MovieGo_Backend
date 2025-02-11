const express = require("express");
const wrapAsync = require("../../Utils/WrapAsync");
const { adminSignUp, adminLogin, adminRefreshToken } = require("../../Controllers/Admin/AdminAuth");
const { validateAdmin } = require("../../Utils/Validatations");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isAdmin = require("../../MiddleWares/isAdmin");
const router = express.Router();

router.post("/signup", validateAdmin, wrapAsync(adminSignUp));
router.post("/login", wrapAsync(adminLogin));
router.get("/refreshtoken", IsAutheticated, isAdmin, wrapAsync(adminRefreshToken))

module.exports = router;