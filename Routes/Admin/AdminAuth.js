const express = require("express");
const wrapAsync = require("../../Utils/WrapAsync");
const { adminSignUp, adminLogin } = require("../../Controllers/Admin/AdminAuth");
const router = express.Router();

router.post("/signup", wrapAsync(adminSignUp))
router.post("/login", wrapAsync(adminLogin));

module.exports = router;