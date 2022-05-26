var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategoryDeatilSchema = new Schema({
	categoryName: {type: String, required: true},
	startNFTLimit: {type: Number, required: true}, 
	endNFTLimit: {type: Number, required: true},   
	counterNFT: {type: Number, required: true},    
	availableNFTs:{type: Number, value: [Number], required: true},
}, {timestamps: true});

module.exports = mongoose.model("CategoryDetail", CategoryDeatilSchema);