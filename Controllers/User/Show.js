const { populate } = require("../../Models/admin");
const Show = require("../../Models/show");
const ExpressError = require("../../Utils/ExpressError");

module.exports.getMovieShows = async (req, res) => {
  const movieId = req.params.movieId;

  const shows = await Show.find({ movie: movieId, bookingStatus: "Open" })
    .select("-seats")
    .populate("movie")
    .populate("theater")
    .populate("screen");

  res.status(200).json(shows);
};

module.exports.getShowDetails = async (req, res) => {
  const showId = req.params.showId;

  const show = await Show.findOne({ _id: showId, bookingStatus: "Open" })
    .populate("seats")
    .populate("movie")
    .populate("theater")
    .populate("screen");
  if (!show) {
    throw new ExpressError(404, "Show not found");
  }

  res.status(200).json(show);
};
