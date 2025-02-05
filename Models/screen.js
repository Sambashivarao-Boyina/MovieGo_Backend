const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screenSchema = new Schema({
    screenName: {
        type: String,
        required:true,
    },
    theater: {
        type: Schema.Types.ObjectId,
        required:true
    }
})


const Screen = mongoose.Model("Screen", screenSchema);

module.exports  = Screen;