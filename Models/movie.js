const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    duration: {
        type: Number,
        required:true,
    },
    language: {
        type: String,
        required:true,
    },
    posterUrl: {
        type: String,
        required:true
    }

})

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;