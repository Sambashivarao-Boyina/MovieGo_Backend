const { createMovie, getAllAdminMovies, deleteAdminMovie } = require("../../Controllers/Admin/Movies");
const isAdmin = require("../../MiddleWares/isAdmin");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const WrapAsync = require("../../Utils/WrapAsync");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { validateMovie } = require("../../Utils/Validatations");

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

const router = require("express").Router();

router.post(
  "/",
  IsAutheticated,
  isAdmin,
  upload.single("poster"),
  validateMovie,
  WrapAsync(createMovie)
);
router.get("/", IsAutheticated, isAdmin, WrapAsync(getAllAdminMovies));
router.delete("/:movieId", IsAutheticated, isAdmin, WrapAsync(deleteAdminMovie));

module.exports = router;