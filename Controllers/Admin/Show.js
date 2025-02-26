const { Schema } = require("mongoose");
const Admin = require("../../Models/admin");
const Theater = require("../../Models/theater");
const ExpressError = require("../../Utils/ExpressError");
const Show = require("../../Models/show");

module.exports.createShow = async (req, res, next) => {
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
        throw new ExpressError(404, "Admin not found");
    }

    const theater = await Theater.findById(req.body.theater);

    if (!theater) {
        throw new ExpressError(404, "Theater Not found");
    }

    if (admin.theaters.indexOf(req.body.theater) === -1) {
        throw new ExpressError(404, "You doest have this Theater");
    } 

    if (theater.screens.indexOf(req.body.screen) === -1) {
        throw new ExpressError(404, "This screen is not in the theater");
    } 

    if (admin.movies.indexOf(req.body.movie) === -1) {
        throw new ExpressError(404, "You does't have this movie");
    }

    const show = new Show(req.body);
    show.admin = admin._id;



    for (let row = 'A'.charCodeAt(0); row <= 'N'.charCodeAt(0); row++) {
        for (let col = 1; col <= 20; col++) {
            show.seats.push({
                seatCode: String.fromCharCode(row) + col
            });
        }
    }

    await show.save();


    res.status(201).json({ message: "Show is created" });

}

module.exports.getShowsList = async (req, res, next) => {
    let shows = await Show.find({ admin: req.user.id })
      .populate("movie")
      .populate("theater")
      .populate("screen")
      .select("-seats");
    

    res.status(200).json(shows);
}

module.exports.getShow = async (req, res, next) => {
    const show = await Show.findById(req.params.showId).populate("theater").populate("movie").populate("screen");

    if (!show) {
        throw new ExpressError(404, "Show not found");
    }

    if (!show.admin.equals(req.user.id)) {
        throw new ExpressError(401, "You are not the Admin of the Show");
    }

    res.status(201).json(show);
}