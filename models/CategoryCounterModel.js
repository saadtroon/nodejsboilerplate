var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategoryCounterSchema = new Schema({
	categoryName: {type: String, required: true},
	shoeType: {type: String, required: true},
	counterNFT: {type: Number, required: true},
}, {timestamps: true});

module.exports = mongoose.model("CategoryCounter", CategoryCounterSchema);