const Movie = require("../../Models/movie");
const Show = require("../../Models/show");

//gives only active movies which have shows
module.exports.getAllMoviesForBooking = async (req, res) => {

  const movieIds = await Show.distinct("movie", { bookingStatus: "Open" });
  const movies = await Movie.find({_id: {$in:movieIds}});

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