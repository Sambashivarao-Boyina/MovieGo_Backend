const Admin = require("../../Models/admin");
const Theater = require("../../Models/theater");
const deleteImageByUrl = require("../../Utils/DeleteImage");
const ExpressError = require("../../Utils/ExpressError");

module.exports.createNewTheater = async (req, res) => {
  const theater = JSON.parse(req.body.theater);
  const { longitude, latitude, ...rest } = theater;

  const admin = await Admin.findById(req.user.id);

  const newTheater = new Theater({
    ...rest,
    image: req.file.path,
    location: {
      type: "Point",
      coordinates: [theater.longitude, theater.latitude],
    },
  });

  newTheater.admin = req.user.id;

  const savedTheater = await newTheater.save();
  admin.theaters.push(savedTheater._id);

  await admin.save();

  res.status(200).json({ message: "Successfully created Theater" });
};

module.exports.getAllTheatersOfAdmin = async (req, res) => {
  const theaters = await Theater.find({ admin: req.user.id }).populate(
    "screens"
  );

  res.status(200).json(theaters);
};

module.exports.getTheaterDetails = async (req, res) => {
  const theaterId = req.params.theaterId;

  if (!theaterId) {
    new ExpressError(404, "Theater Id is empty");
  }

  const theater = await Theater.findById(theaterId).populate("screens");
  if (!theater) {
    new ExpressError(404, "Theater Not found");
  }

  if (theater.admin !== req.user.id) {
    new ExpressError(401, "You are not admin of this theater");
  }

  res.status(200).json(theater);
};

module.exports.editTheater = async (req, res) => {
  const theaterId = req.params.theaterId;

  let newTheaterValues = JSON.parse(req.body.theater);

  const theater = await Theater.findById(theaterId);

  if (req.file && req.file.path) {
    await deleteImageByUrl(theater.image);
  }

  newTheaterValues = {
    ...newTheaterValues,
    location: {
      type: "Point",
      coordinates: [newTheaterValues.longitude, newTheaterValues.latitude],
    },
  };

  if (req.file) {
    newTheaterValues = {
      ...newTheaterValues,
     
      image: req.file.path,
    };
  }

 await Theater.findByIdAndUpdate(theaterId, newTheaterValues);
  

  res.status(200).json({ message: "Successfully Edited Theater" });
};
