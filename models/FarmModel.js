var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FarmSchema = new Schema({
	userAddress: {type: String, required: true},
	categoryName: {type: String, required: true},
    categoryBytes: {type: String, required: true},
	farmId: {type: Number},
    typeNFT: {type: String, required: true},
    mintStatus: {type: String},
    assignedNFT: {type: Number, required: false},
}, {timestamps: true});

module.exports = mongoose.model("Farm", FarmSchema);