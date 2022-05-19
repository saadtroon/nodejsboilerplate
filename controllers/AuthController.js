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
const { constants } = require("../helpers/constants");
const fs = require("fs");
const cron = require("node-cron");
const bytes32 = require('bytes32');


Listener.eventListener()
Listener.eventListenerRapid()
/**
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.register = [
	// Validate fields.
	// body("firstName").isLength({ min: 1 }).trim().withMessage("First name must be specified.")
	// 	.isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
	// body("lastName").isLength({ min: 1 }).trim().withMessage("Last name must be specified.")
	// 	.isAlphanumeric().withMessage("Last name has non-alphanumeric characters."),
	// body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
	// 	.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
	// 		return UserModel.findOne({email : value}).then((user) => {
	// 			if (user) {
	// 				return Promise.reject("E-mail already in use");
	// 			}
	// 		});
	// 	}),
	// body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	// // Sanitize fields.
	// sanitizeBody("firstName").escape(),
	// sanitizeBody("lastName").escape(),
	// sanitizeBody("email").escape(),
	// sanitizeBody("password").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		console.log("req::",req.body);
		try {
			// Extract the validation errors from a request.
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	// Display sanitized values/errors messages.
			// 	return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			// }else {
				//hash input password
				bcrypt.hash(req.body.password,10,function(err, hash) {
					console.log("hashed",hash,err);
					// generate OTP for confirmation
					let otp = utility.randomNumber(4);
					console.log("otp:",otp)
					// Create User object with escaped and trimmed data
					var user = new UserModel(
						{
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							password: hash,
							confirmOTP: otp
						}
					);
					console.log("user:",user);
					user.save(function (err) {
						console.log("error", err);
						if (err) {  return apiResponse.ErrorResponse(res, err); }
						;
						return apiResponse.successResponseWithData(res,"Registered.");
					});
				});
				
		//	}
		} catch (err) {
			console.log("err",err);
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];

	exports.dataDumping= [
		(req, res) => {

			var attributes = {}
			var folder = req.body.folder;
			var startlimit = req.body.startlimit;
			var endlimit = req.body.endlimit;
			console.log("start",startlimit,endlimit,folder);
			try {//../dist/1\ COMMON/json/

				for(var i=startlimit;i<=endlimit;i++) {
					console.log("loop");
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
							Shoetype: attributes.ShoeType,
							Category:Category,
							Image: "/pinata"+information.image,
							BACKGROUND: attributes.BACKGROUND,
							BACKGROUNDASSET: attributes.BACKGROUNDASSET,
							BASESHOE: attributes.BASESHOE,
							PATTERN: attributes.PATTERN,
							TRIBE: attributes.TRIBE,
							FRONT: attributes.FRONT,
							SIDE: attributes.SIDE,
							BACK: attributes.BACK,
							ACCESORIES: attributes.ACCESORIES,
							WEAPON: attributes.WEAPON,
							ASSETSHOE: attributes.ASSETSHOE,
							ASSETLASER: attributes.ASSETLASER,
							SHOESIDECOLOURGRADIENT: attributes.SHOESIDECOLOURGRADIENT,
							NFTNumber: information.edition,
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
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				UserModel.findOne({email : req.body.email}).then(user => {
					if (user) {
						//Compare given password with db's hash.
						bcrypt.compare(req.body.password,user.password,function (err,same) {
							if(same){
								//Check account confirmation.
								if(user.isConfirmed){
									// Check User's account active or not.
									if(user.status) {
										let userData = {
											_id: user._id,
											firstName: user.firstName,
											lastName: user.lastName,
											email: user.email,
										};
										//Prepare JWT token for authentication
										const jwtPayload = userData;
										const jwtData = {
											expiresIn: process.env.JWT_TIMEOUT_DURATION,
										};
										const secret = process.env.JWT_SECRET;
										//Generated JWT token with Payload and secret.
										userData.token = jwt.sign(jwtPayload, secret, jwtData);
										return apiResponse.successResponseWithData(res,"Login Success.", userData);
									}else {
										return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
									}
								}else{
									return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
								}
							}else{
								return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
							}
						});
					}else{
						return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * Verify Confirm otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */
exports.verifyConfirm = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("otp").isLength({ min: 1 }).trim().withMessage("OTP must be specified."),
	sanitizeBody("email").escape(),
	sanitizeBody("otp").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						//Check already confirm or not.
						if(!user.isConfirmed){
							//Check account confirmation.
							if(user.confirmOTP == req.body.otp){
								//Update user as confirmed
								UserModel.findOneAndUpdate(query, {
									isConfirmed: 1,
									confirmOTP: null 
								}).catch(err => {
									return apiResponse.ErrorResponse(res, err);
								});
								return apiResponse.successResponse(res,"Account confirmed success.");
							}else{
								return apiResponse.unauthorizedResponse(res, "Otp does not match");
							}
						}else{
							return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
						}
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.resendConfirmOtp = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	sanitizeBody("email").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						//Check already confirm or not.
						if(!user.isConfirmed){
							// Generate otp
							let otp = utility.randomNumber(4);
							// Html email body
							let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";

						}else{
							return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
						}
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];



/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.getFarms = [
	(req, res) => {
		console.log("api requested", req.params);
		var query = {userAddress: req.params.userAddress,typeNFT: req.params.typeNFT, category: req.params.category };
		
		farmModel.find(query).then(user => {
			console.log(user);
			return apiResponse.successResponse(res,"Account confirmed success."+user);
		});
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