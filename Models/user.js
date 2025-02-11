const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        bookings: [
            {
                type: Schema.Types.ObjectId,
                ref: "Booking",
            },
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
                delete ret.__t;
            },
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;