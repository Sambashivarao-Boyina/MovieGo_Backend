const Screen = require("../../Models/screen");
const Theater = require("../../Models/theater");
const ExpressError = require("../../Utils/ExpressError");

module.exports.createScreen = async (req, res, next) => {
    const theaterId = req.params.theaterId;
    const theater = await Theater.findById(theaterId).populate("screens");
    if (!theater) {
        throw new ExpressError(404, "Theater Not found");
    }

    if (!theater.admin.equals(req.user.id)) {
        throw new ExpressError(401, "You not the admin of the theater");
    }

    const screenNameAlreadyContains = theater.screens.some((screen) => screen.screenName === req.body.screenName);

    if (screenNameAlreadyContains) {
        throw new ExpressError(409, "Screen Name already exist");
    }

    const newScreen = new Screen(req.body);

    newScreen.theater = theater._id;

    const savedScreen = await newScreen.save();

    theater.screens.push(savedScreen._id);

    await theater.save();


    res.status(201).json({ messsage: "Screen is added" });
}

module.exports.getAllScreen = async (req, res, next) => {
    const theaterId = req.params.theaterId;
    const theater = await Theater.findById(theaterId).populate("screens");
    if (!theater) {
      throw new ExpressError(404, "Theater Not found");
    }

    if (!theater.admin.equals(req.user.id)) {
      throw new ExpressError(401, "You not the admin of the theater");
    }

    res.status(200).json(theater.screens)
}