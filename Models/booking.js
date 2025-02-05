const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    show: {
        type: Schema.Types.ObjectId,
        ref:"Show"
    },
    seats: [
        {
            type: String,
            required:true
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;