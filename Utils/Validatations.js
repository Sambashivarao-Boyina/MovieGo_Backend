const adminSchema = require("../JoiSchema/adminSchema");
const movieSchema = require("../JoiSchema/movieSchema");
const screenSchema = require("../JoiSchema/screenSchema");
const showSchema = require("../JoiSchema/showSchema");
const theaterSchema = require("../JoiSchema/theaterSchema");
const userSchema = require("../JoiSchema/userSchema");
const ExpressError = require("./ExpressError");

module.exports.validateAdmin = (req, res, next) => {
    let { error } = adminSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateTheater = (req, res, next) => {
    
    let { error } = theaterSchema.validate(JSON.parse(req.body.theater));
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateScreen = (req, res, next) => {
    let { error } = screenSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateMovie = (req, res, next) => {
    let { error } = movieSchema.validate(JSON.parse(req.body.movie));
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateShow = (req, res, next) => {
    let { error } = showSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateUser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}