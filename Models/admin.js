const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
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
        role: {
            type: String,
            default: "Admin",
            required: true,
        },
        theaters: [
            {
                type: Schema.Types.ObjectId,
                ref: "Theater",
            },
        ],
        movies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Movie",
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

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
