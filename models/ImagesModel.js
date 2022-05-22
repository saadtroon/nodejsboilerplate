var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ImagesSchema = new Schema({
    shoeType: {type: String, required: true}, // Common
    categoryName: {type: String, required: true}, // PHonenix
    layerNum: {type: Number, required: true}, // 1
    traitType: {type: String, required: true}, // background
    imageName: {type: String, required: true}, // baby blue
    image: {type: String, required: true},  //  baby blue
}, {timestamps: true});

module.exports = mongoose.model("Images", ImagesSchema);