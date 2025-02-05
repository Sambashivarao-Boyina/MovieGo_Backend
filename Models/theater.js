const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required:true,
    },
    screens: [
        {
            type: Schema.Types.ObjectId,
            ref: "Screen",
        },
    ],
});

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
