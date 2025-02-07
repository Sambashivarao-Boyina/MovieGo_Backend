const Admin = require("../../Models/admin");
const Movie = require("../../Models/movie");
const ExpressError = require("../../Utils/ExpressError");

module.exports.createMovie = async (req, res, next) => {
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
        throw new ExpressError(404, "Admin not found");
    }

    const newMovie = new Movie(req.body);

    const savedMovie = await newMovie.save();

    admin.movies.push(savedMovie._id);

    await admin.save();

    res.status(201).json({ message: "Movie created Successfully" });
}

module.exports.getAllAdminMovies = async (req, res, next) => {
    const admin = await Admin.findById(req.user.id).populate("movies")

    if (!admin) {
        throw new ExpressError(404, "Admin not found");
    }

    res.status(200).json(admin.movies);
}

module.exports.deleteAdminMovie = async (req, res, next) => {

    const movieId = req.params.movieId;
    await Admin.updateOne({ _id: req.user.id }, { $pull: { movies: movieId } });

    res.status(201).json({ message: "Movie Removed from the list" });
}