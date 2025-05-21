const Movie = require("../../Models/movie");
const Show = require("../../Models/show");

//gives only active movies which have shows
module.exports.getAllMoviesForBooking = async (req, res) => {
  const state = req.params.state;
  const city = req.params.city;

  const shows = await Show.find({ bookingStatus: "Open" }).populate("theater");

  let movieIds = new Set();

  for (let show of shows) {
   

    if (
      show.theater.state.trim().toLowerCase() === state.trim().toLowerCase() &&
      show.theater.city.trim().toLowerCase() === city.trim().toLowerCase()
    ) {
      movieIds.add(show.movie.toString()); // convert ObjectId to string if needed
    }
  }


  const movies = await Movie.find({ _id: { $in: [...movieIds] } });

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