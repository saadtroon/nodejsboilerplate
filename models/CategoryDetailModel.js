var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FarmSchema = new Schema({
	categoryName: {type: String, required: true},
	startNFTLimit: {type: Number, required: true}, 
	endNFTLimit: {type: Number, required: true},   
	counterNFT: {type: Number, required: true},    
}, {timestamps: true});

module.exports = mongoose.model("CategoryDetail", FarmSchema);