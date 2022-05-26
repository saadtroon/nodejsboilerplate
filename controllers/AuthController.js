const UserModel = require("../models/UserModel");
const ShoefyModel = require("../models/ShoefyModel");
const CategoryDetailModel = require("../models/CategoryDetailModel");
const Listener = require("./ListenerController");
const farmModel = require("../models/FarmModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const commonService = require("../services/common");
const uniqueService = require("../services/unique");
const rareService = require("../services/rare");
const legendaryService = require("../services/legendary");
const epicService = require("../services/epic");
const mythicgodService = require("../services/mythicgod");
const mythicdevilService = require("../services/mythicdevil");
const mythicalienService = require("../services/mythicalien");



Listener.eventListener()
Listener.eventListenerRapid()

	exports.dataDumping= [
		(req, res) => {
			var attributes = {}
			var folder = req.body.folder;
			var startlimit = req.body.startlimit;
			var endlimit = req.body.endlimit;
			console.log("start",startlimit,endlimit,folder);
			try {//../dist/1\ COMMON/json/
				for(var i=startlimit;i<=endlimit;i++) {
				fs.readFile("./dist/"+folder+"/"+i+".json", "utf8", (err, jsonString) => {
				if (err) {
					console.log("Error reading file from disk:", err);
					return;
				}
				try {
					const information = JSON.parse(jsonString);
					console.log("Customer address is:", information); // => "information address is: Infinity Loop Drive"
					console.log("name:",information.name);
					var Category = "";
					if(information.description.includes('Phoenix')){
						Category = 'Phoenix'
					} else if(information.description.includes('Pegasus')){
						Category = 'Pegasus'
					} else if(information.description.includes('Taurus')){
						Category = 'Taurus'
					} else if(information.description.includes('Whale')){
						Category = 'Whale'
					}

					var loop = 0;
					for (var i in information.attributes) {
						console.log(information.attributes[i].trait_type.replace(/\s/g, ""));
						console.log(information.attributes[i].value.replace(/\s/g, ""));
						attributes[information.attributes[i].trait_type.replace(/\s/g, "")] = (information.attributes[i].value.replace(/\s/g, ""));

					}
					
					// Create User object with escaped and trimmed data
					var shoe = new ShoefyModel(
						{
							shoetype: attributes.ShoeType,
							categoryName:Category,
							image: "/pinata"+information.image,
							background: attributes.BACKGROUND,
							backgroundAsset: attributes.BACKGROUNDASSET,
							baseShoe: attributes.BASESHOE,
							pattern: attributes.PATTERN,
							tribe: attributes.TRIBE,
							front: attributes.FRONT,
							side: attributes.SIDE,
							back: attributes.BACK,
							accesories: attributes.ACCESORIES,
							weapon: attributes.WEAPON,
							assetShoe: attributes.ASSETSHOE,
							assetLayer: attributes.ASSETLASER,
							shoeSideColourGradient: attributes.SHOESIDECOLOURGRADIENT,
							sNFTNumber: information.edition,
						}
					);

					shoe.save(function (err) {
						
						if (err) { console.log("error", err); return apiResponse.ErrorResponse(res, err); 
						};
						
					});

				} catch (err) {
					console.log("Error parsing JSON string:", err);
				  }
				});
			  }

			return apiResponse.successResponseWithData(res,"Dumped.");
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}

		}];


/**
 * getFarms.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.getFarms = [
	(req, res) => {
		try{
		console.log("calling getFarms:");
		var query = {userAddress: req.params.userAddress,typeNFT: req.params.NFTType, categoryName: req.params.category };
		
		let response = [];
		
		farmModel.find(query).then(async function(farms) {
			
			farms.forEach(async function (farm){

				if (Date.now() > farm.nextUpdatedTimestamp && farm.mintStatus == "Pending"){
					console.log("--------------------"+farm.categoryName);

					switch(farm.categoryName){
						case "COMMON":
							farm  = await commonService(farm);
							farmModel.findByIdAndUpdate({ _id: farm._id }, farm, { new: true }, (err, doc) => {
								if (!err) { console.log("Farm updated successfully"); }
								else {
									console.log("Farm updation failed", err);
								}
							});
							break;
						case "UNIQUE":
							farm  = await uniqueService(farm);
							farmModel.findByIdAndUpdate({ _id: farm._id }, farm, { new: true }, (err, doc) => {
								if (!err) { console.log("Farm updated successfully"); }
								else {
									console.log("Farm updation failed", err);
								}
							});
							break;
						case "RARE":
							farm  = await rareService(farm);
							farmModel.findByIdAndUpdate({ _id: farm._id }, farm, { new: true }, (err, doc) => {
								if (!err) { console.log("Farm updated successfully"); }
								else {
									console.log("Farm updation failed", err);
								}
							});
							break;
						case "EPIC":
							epicService
							break;
						case "LEGENDARY":
							legendaryService
							break;
						case "MYTHICGOD":
							mythicgodService
							break;
						case "MYTHICDEVIL":
							mythicdevilService
							break;
						case "MYTHICALIEN":
							mythicalienService
							break;

					}
					
				}else{
					console.log(farm);
					response.push(farm);
				}
			});

		});
		console.log("farm--------------");

		// ShoefyModel.find(query).then(shoefy => {
		// 	console.log("shoefy::",shoefy)
		// });
		return apiResponse.successResponse(res, {result: response});

	} catch(e){
		console.log(e);
	}
	}
	];

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.addCategory = [
	(req, res) => {
		console.log("api requested", req.body);
							// Create User object with escaped and trimmed data
							var addCategory = new CategoryDetailModel(
								{
									categoryName: req.body.categoryName,
									startNFTLimit: req.body.startNFTLimit, 
									endNFTLimit: req.body.endNFTLimit,
									counterNFT: req.body.startNFTLimit,
								}
							);
		
							addCategory.save(function (err) {
								
								if (err) { console.log("error", err); return apiResponse.ErrorResponse(res, err); 
								};

								return apiResponse.successResponseWithData(res,"Added.");

							});
	}
];