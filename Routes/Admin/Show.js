const { createShow, getShow, getShowsList } = require("../../Controllers/Admin/Show");
const isAdmin = require("../../MiddleWares/isAdmin");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const { validateShow } = require("../../Utils/Validatations");
const WrapAsync = require("../../Utils/WrapAsync");

const router = require("express").Router();

router.post("/", IsAutheticated, isAdmin, validateShow, WrapAsync(createShow));
router.get("/", IsAutheticated, isAdmin, WrapAsync(getShowsList))
router.get("/:showId", IsAutheticated, isAdmin, WrapAsync(getShow));


module.exports = router;