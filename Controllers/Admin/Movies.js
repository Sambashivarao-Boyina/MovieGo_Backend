const Admin = require("../../Models/admin");
const Movie = require("../../Models/movie");
const ExpressError = require("../../Utils/ExpressError");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.createMovie = async (req, res, next) => {
  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    throw new ExpressError(404, "Admin not found");
  }

  const movieName = req.params.movieName;

  // Check if movie already exists
  const existingMovie = await Movie.findOne({ Title: movieName });

  if (existingMovie) {
    if (admin.movies.includes(existingMovie._id)) {
      throw new ExpressError(409, "Movie is already in your collection");
    }
    admin.movies.push(existingMovie._id);
    await admin.save();
    return res.status(200).json({ message: "Movie added to your collection" });
  }

  // Fetch movie data from OMDB API
  const response = await fetch(
    `http://www.omdbapi.com/?t=${movieName}&apikey=19fbfd13`
  );
  const data = await response.json();

  if (data.Response === "False") {
    throw new ExpressError(404, "Movie not found");
  }

  // Download poster image
  const posterUrl = data.Poster;
  const imagePath = path.join(__dirname, "../uploads/temp.jpg");

  const downloadImage = async (url, imagePath) => {
    const response = await fetch(url);
    if (!response.ok)
      throw new ExpressError(500, "Failed to download image, Try Again");

    // Ensure the uploads directory exists
    const uploadDir = path.dirname(imagePath);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(imagePath, buffer);
  };


  await downloadImage(posterUrl, imagePath);

  // Upload image to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(imagePath, {
    folder: "MovieGo",
  });
  
  // Clean up temporary file
  fs.unlinkSync(imagePath);

  // Replace poster URL with Cloudinary URL
  data.Poster = uploadResult.secure_url;

  // Save movie in DB
  const newMovie = new Movie(data);
  const savedMovie = await newMovie.save();

  admin.movies.push(savedMovie._id);
  await admin.save();

  res.status(201).json({
    message: "Movie created successfully",
  });
};

module.exports.getAllAdminMovies = async (req, res, next) => {
  const admin = await Admin.findById(req.user.id).populate("movies");

  if (!admin) {
    throw new ExpressError(404, "Admin not found");
  }

  res.status(200).json(admin.movies);
};

module.exports.deleteAdminMovie = async (req, res, next) => {
  const movieId = req.params.movieId;
  await Admin.updateOne({ _id: req.user.id }, { $pull: { movies: movieId } });

  res.status(201).json({ message: "Movie Removed from the list" });
};


module.exports.getMovieDetails = async (req, res, next) => {
  const movieId = req.params.movieId;

  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new ExpressError(404, "Movie Not found");
  }

  res.status(200).json(movie);
}