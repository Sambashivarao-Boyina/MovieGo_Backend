const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    theater: {
        type: Schema.Types.ObjectId,
        ref: "Theater",
        required: true,
    },
    screen: {
        type: Schema.Types.ObjectId,
        ref: "Screen",
        required: true,
    },
    showTime: {
        type: String,
        required: true,
    },
    seats: [
        {
            seatCode: { type: String, required: true }, // e.g., "A1", "B2"
            status: {
                type: String,
                enum: ["Available", "Processing", "Booked"],
                default: "Available",
            },
            bookedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: null,
            }, // Track user
            processingUntil: { type: Date, default: null }, // Timeout for processing state
        },
    ],
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;