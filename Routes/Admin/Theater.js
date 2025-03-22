const express = require("express");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isAdmin = require("../../MiddleWares/isAdmin");
const WrapAsync = require("../../Utils/WrapAsync");
const {
  createNewTheater,
  getAllTheatersOfAdmin,
  getTheaterDetails,
  editTheater,
} = require("../../Controllers/Admin/Theater");
const router = express.Router();

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { validateTheater } = require("../../Utils/Validatations");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MovieGo",
  },
});

const upload = multer({ storage });

router.post(
  "/",
  IsAutheticated,
  isAdmin,
  upload.single("image"),
  validateTheater,
  WrapAsync(createNewTheater)
);
router.put(
  "/:theaterId",
  IsAutheticated,
  isAdmin,
  upload.single("image"),
  validateTheater,
  WrapAsync(editTheater)
);
router.get("/", IsAutheticated, isAdmin, WrapAsync(getAllTheatersOfAdmin));
router.get(
  "/:theaterId",
  IsAutheticated,
  isAdmin,
  WrapAsync(getTheaterDetails)
);

module.exports = router;
