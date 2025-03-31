const Movie = require("../../Models/movie")

module.exports.getAllMoviesForBooking = async (req, res) => {
    const movies = await Movie.find();

    res.status(200).json(movies);
}

module.exports.getMovieDetails = async (req, res, next) => {
  const movieId = req.params.movieId;

  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new ExpressError(404, "Movie Not found");
  }

  res.status(200).json(movie);
}