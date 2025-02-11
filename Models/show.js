const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref:"Admin",
        required: true,
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    ticketCost: {
        type: Number,
        required: true
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
    date: {
        type: String,
        required: true,
    },
    showTime: {
        type: String,
        required: true,
    },
    seats: [
        new Schema(
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
                },
                processingUntil: { type: Date, default: null },
            },
            { _id: false, id: false }
        ), // ✅ Disable both _id and id
        ],
    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.id;
                delete ret.__v;
            },
        },
        toObject: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.id;
                delete ret.__t
            },
        },
    }
);

showSchema.virtual("bookedSeatsCount").get(function () {
  return Array.isArray(this.seats) ? this.seats.filter((seat) => seat.status === "Booked").length : 0;
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
