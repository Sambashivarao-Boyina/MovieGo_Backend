const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screenSchema = new Schema(
  {
    screenName: {
      type: String,
      required: true,
    },
    screenType: {
      type: String,
      required: true,
      enum: [
        "Standard 2D Screen",
        "IMAX Screen",
        "Dolby Cinema Screen",
        "3D Screen",
        "4DX Screen",
        "ScreenX",
        "LED Cinema Screen",
        "Laser Projection Screen",
        "Drive-in Screen",
        "Dome/Planetarium Screen",
      ],
    },
    soundType: {
      type: String,
      required: true,
      enum: [
        "Dolby Digital",
        "Dolby Atmos",
        "DTS",
        "DTS:X",
        "Auro 11.1",
        "IMAX Sound System",
        "THX Sound System",
        "7.1 Surround Sound",
        "5.1 Surround Sound",
        "Meyer Sound System",
      ],
    },
    theater: {
      type: Schema.Types.ObjectId,
      ref:"Theater",
      required: true,
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

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;
