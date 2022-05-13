var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FarmSchema = new Schema({
	userAddress: {type: String, required: true},
	category: {type: String, required: true},
	farmId: {type: Number},
    NFTType: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model("Farm", FarmSchema);