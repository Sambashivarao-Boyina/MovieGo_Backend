const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref:"Booking"
        }
    ]
})

const User = mongoose.model("User", userSchema);

module.exports = User;