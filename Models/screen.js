const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screenSchema = new Schema({
    screenName: {
        type: String,
        required: true,
    },
    screenType: {
        type: String,
        required: true,
        enum: ["2D", "3D", "Imax", "4DX", "Dolby Cinema"],
    },
    soundType: {
        type: String,
        required: true,
        enum: [
            "Dolby Atmos",
            "Dolby Digital",
            "Dolby Digital Plus",
            "DTS",
            "IMAX Sound",
        ],
    },
    theater: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;
