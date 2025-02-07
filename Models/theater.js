const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contactNumber: {
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
        enum: [
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu",
            "Lakshadweep",
            "Delhi",
            "Puducherry",
            "Ladakh",
            "Jammu and Kashmir"
        ],
    },
    pincode: {
        type: String,
        required: true,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
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
