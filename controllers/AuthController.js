const ShoefyModel = require("../models/ShoefyModel");
const CategoryDetailModel = require("../models/CategoryDetailModel");
const Listener = require("./ListenerController");
const farmModel = require("../models/FarmModel");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const fs = require("fs");

const commonService = require("../services/common");
const uniqueService = require("../services/unique");
const rareService = require("../services/rare");
const legendaryService = require("../services/legendary");
const epicService = require("../services/epic");
const mythicgodService = require("../services/mythicgod");
const mythicdevilService = require("../services/mythicdevil");
const mythicalienService = require("../services/mythicalien");
const commonRapidService = require("../services/commonRapid");
const uniqueRapidService = require("../services/uniqueRapid");

const signService = require("../services/sign");

Listener.eventListener();
Listener.eventListenerRapid();

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
		try {
		console.log("calling getFarms:");
		var query = {userAddress: req.params.userAddress,typeNFT: req.params.NFTType, categoryName: req.params.category.toUpperCase() };
		
		let response = [];
		
		farmModel.find(query).then(async function(farms) {
			console.log("famrs length:",farms.length);
			farms.forEach(async function (farm){

				if (Date.now() > farm.nextUpdatedTimestamp && farm.mintStatus == "Pending") {
					console.log("--------------------"+farm.categoryName);
					if (farm.typeNFT == "general") {
						switch(farm.categoryName) {
							case "COMMON":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await commonService(farm);
								}
								break;
								
							case "UNIQUE":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await uniqueService(farm);
								}
								break;
							case "RARE":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await rareService(farm);
								}
								break;
							case "EPIC":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await epicService(farm);
								}
								break;
							case "LEGENDARY":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await legendaryService(farm);
								}
								break;
							case "MYTHICGOD":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await mythicgodService(farm);
								}
								break;
							case "MYTHICDEVIL":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await mythicdevilService(farm);
								}
								break;
							case "MYTHICALIEN":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await mythicalienService(farm);
								}
								break;
						}

						farmModel.findByIdAndUpdate({ _id: farm._id }, farm, { new: true }, (err, doc) => {
							if (!err) { console.log("Farm updated successfully"); }
							else {
								console.log("Farm updation failed", err);
							}
						});

					} else if(farm.typeNFT == "rapid") {
						switch(farm.categoryName) {
							case "COMMON":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await commonRapidService(farm);
								}
								break;
								
							case "UNIQUE":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await uniqueRapidService(farm);
								}
								break;
							case "RARE":
								while(farm.mintStatus == "Pending" && farm.nextUpdatedTimestamp < Date.now()){
									farm  = await rareRapidService(farm);
								}
								break;

						}
						
						farmModel.findByIdAndUpdate({ _id: farm._id }, farm, { new: true }, (err, doc) => {
							if (!err) { console.log("Farm updated successfully"); }
							else {
								console.log("Farm updation failed", err);
							}
						});
					
				    } 
				} else{
					console.log(farm);
					response.push(farm);
					}
				
			});

		});
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

		let availableNftList = []
		let i,index = 0;


		for (i = req.body.startNFTLimit; i<= req.body.endNFTLimit; i++){
			availableNftList[index] = i;
			index +=1;
		}

		var addCategory = new CategoryDetailModel(
			{
				categoryName: req.body.categoryName,
				startNFTLimit: req.body.startNFTLimit, 
				endNFTLimit: req.body.endNFTLimit,
				counterNFT: req.body.startNFTLimit,
				availableNFTs: availableNftList
			}
		);

		addCategory.save(function (err) {
			
			if (err) { console.log("error", err); return apiResponse.ErrorResponse(res, err); 
			};

			return apiResponse.successResponseWithData(res,"Added.");

		});
	}
];

exports.getSigns = [
	async (req,res) =>{
		var query = {userAddress: req.params.userAddress,typeNFT: req.params.NFTType, categoryName: req.params.category, mintStatus:"Complete"};
		let farmIds =  req.body.farmIds;
		let resp = []
		let msgHash, verificationSign;

		resp = await farmModel.find(query).then(async function(farms) {
			farms.forEach(async function (farm){

				if (farmIds.includes(farm.farmId)){
					msgHash = signService.getmessageHash(req.params.userAddress, farm.farmId, farm.assignedNFT);
					verificationSign = signService.signMessage(msgHash, process.env.SIGNER_ADDRESS, process.env.SIGNER_PK);
					resp.push({farmId: farm.farmId, sign: verificationSign.signature});
				}
			});
			return resp;
		});

		console.log(resp);
		return apiResponse.successResponseWithData(res, resp);

	}
];

