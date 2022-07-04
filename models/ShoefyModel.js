var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ShoefySchema = new Schema({
	shoetype: {type: String, required: true},
	categoryName: {type: String, required: true},
	image: {type: String, required: true},
	background: {type: String, required: false},
	backgroundAsset: {type: String, required: false},
	baseShoe: {type: String, required: false},
	pattern: {type: String, required: false},
	tribe: {type: String, required: false},
	front: {type: String, required: false},
	side: {type: String, required: false},
	back: {type: String, required: false},
	accesories: {type: String, required: false},
	weapon: {type: String, required: false},
	assetShoe: {type: String, required: false},
	assetLayer: {type: String, required: false},
	shoeSideColourGradient: {type: String, required: false},
	shoeSideColour: {type: String, required: false},
	sNFTNumber: {type: Number, required: false}, // shoefyNFTIdcl
	description: {type: String, required: false}
}, {timestamps: true});

module.exports = mongoose.model("Shoefy", ShoefySchema);