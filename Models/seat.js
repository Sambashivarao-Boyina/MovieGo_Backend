  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;

  const seatSchema = new Schema(
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

  const Seat = mongoose.model("Seat", seatSchema);

  module.exports = Seat;
