const mongoose = require("mongoose");
const Seat = require("./seat");
const Schema = mongoose.Schema;

const showSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    ticketCost: {
      type: Number,
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
    date: {
      type: String,
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
    seats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Seat",
      },
    ],
    bookingStatus: {
      type: String,
      default: "Open",
      enum: ["Open", "Closed"],
    },
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
        delete ret.__t;
      },
    },
  }
);

showSchema.virtual("bookedSeatsCount").get(function () {
  return Array.isArray(this.seats)
    ? this.seats.filter((seat) => seat.status === "Booked").length
    : 0;
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
