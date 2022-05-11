var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ShoefySchema = new Schema({
	Shoetype: {type: String, required: true},
	Category: {type: String, required: true},
	Image: {type: String, required: true},
	BACKGROUND: {type: String, required: false},
	BACKGROUNDASSET: {type: String, required: false},
	BASESHOE: {type: String, required: false},
	PATTERN: {type: String, required: false},
	TRIBE: {type: String, required: false},
	FRONT: {type: String, required: false},
	SIDE: {type: String, required: false},
	BACK: {type: String, required: false},
	ACCESORIES: {type: String, required: false},
	WEAPON: {type: String, required: false},
	ASSETSHOE: {type: String, required: false},
	ASSETLASER: {type: String, required: false},
	SHOESIDECOLOURGRADIENT: {type: String, required: false},
}, {timestamps: true});

module.exports = mongoose.model("Shoefy", ShoefySchema);