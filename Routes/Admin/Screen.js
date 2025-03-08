const express = require("express");
const isAutheticated = require("../../MiddleWares/IsAutheticated");
const isAdmin = require("../../MiddleWares/isAdmin");
const WrapAsync = require("../../Utils/WrapAsync");
const { createScreen, getAllScreen, editScreen } = require("../../Controllers/Admin/Screen");
const { validateScreen } = require("../../Utils/Validatations");
const router = express.Router();


router.post("/:theaterId", isAutheticated, isAdmin, validateScreen, WrapAsync(createScreen));
router.get("/:theaterId", isAutheticated, isAdmin, WrapAsync(getAllScreen));
router.put("/:screenId", isAutheticated, isAdmin,validateScreen, WrapAsync(editScreen));


module.exports = router;