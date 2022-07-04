var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FarmGetModelSchema = new Schema({
	userAddress: {type: String, required: true},
	categoryName: {type: String, required: true},
    categoryBytes: {type: String, required: true},
	farmId: {type: Number, required: true, unique: true},
    typeNFT: {type: String, required: true},
    mintStatus: {type: String},
    assignedNFT: {type: Number, required: false},
    currentLayer: {type: Number, required: false, default:0},
    nextUpdatedTimestamp: {type: String, required: false},
    txHash: {type: String, required: false},
    image: {type: String, required: false},
	description: {type: String, required: false},
	shoeType: {type: String, required: false},

}, {timestamps: true});

module.exports = mongoose.model("FarmGet", FarmGetModelSchema);