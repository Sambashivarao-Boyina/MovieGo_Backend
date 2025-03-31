const Show = require("../../Models/show");

module.exports.getMovieShows = async (req, res) => {
    const movieId = req.params.movieId;

    const shows = await Show.find({ movie: movieId }).select("-seats").populate("movie").populate("theater").populate("screen")

    res.status(200).json(shows);
}