var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ImagesSchema = new Schema({
    Shoetype: {type: String, required: true}, // Common
    Category: {type: String, required: true}, // PHonenix
    LayerNum: {type: Number, required: true}, // 1
    traitType: {type: String, required: true}, // background
    ImageName: {type: String, required: true}, // baby blue
    Image: {type: String, required: true},  //  baby blue
}, {timestamps: true});

module.exports = mongoose.model("Images", ImagesSchema);