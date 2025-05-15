const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    show: {
      type: Schema.Types.ObjectId,
      ref: "Show",
      required: true
    },
    seats: [
      {
        type: Schema.Types.ObjectId,
        ref:"Seat",
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    bookingStatus: {
      type: String,
      enum:["Processing", "Canceled","Success"]
    },
    paymentId: {
      type: String,
      default:null
    },
    processingUntil: {
      type: Date,
      default:null
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
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

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;