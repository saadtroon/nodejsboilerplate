const Book = require("../models/BookModel");
const Images = require("../models/ImagesModel");

const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const fs = require("fs");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


/**
 * Book List.
 * 
 * @returns {Object}
 */
exports.saveImages = [
	function (req, res) {
		try {
			console.log("saad");
			dirname = "./UPDATESHOEFY";
				fs.readdir(dirname, function(err, filenameDIR) {
				   if (err) {
					console.log("error",err)
				   }
				   filenameDIR.forEach(function(directory) {
				//	   console.log("subdirectory: ",directory)

					   fs.readdir(dirname+"/"+directory, function(err, filenameDIR1) {
					//	   console.log("filenames:", filenameDIR1)
						if (err) {
						  console.log("error",err);
						}
							filenameDIR1.forEach(function(directory1) {
					//		console.log("subdir:", directory1)
							fs.readdir(dirname+"/"+directory+"/"+directory1, function(err, filenameDIR2) {
							if (err) {
								console.log("error",err)
							}
							filenameDIR2.forEach(function(directory2) {
						//		console.log("subdirectory: ",directory2)
								fs.readdir(dirname+"/"+directory+"/"+directory1+"/"+directory2, function(err, filenameDIR3) {
									console.log("directory:",dirname+"/"+directory+"/"+directory1+"/"+directory2)
									console.log("filenames:", filenameDIR3)
								 if (err) {
								   console.log("error",err);
								 }
								    filenameDIR3.forEach(function(directory3) {
									var base64str =  fs.readFileSync(dirname+"/"+directory+"/"+directory1+"/"+directory2+"/"+directory3, 'base64');

									var stringArray = directory2.split(/(\s+)/);
									console.log("1st part:",stringArray[0]);
									console.log("2nd part:",stringArray[1]);
									console.log("3rd part:",stringArray[2]);
									//let burger = new Buffer(base64str, 'base64');

									  var images = new Images (
									  	{   Shoetype: directory,
									  		Category: directory1,
									  		LayerNum: stringArray[0],
									  		traitType: stringArray[2],
									  		ImageName: directory3,
									  		Image: base64str,
									  	} );
										
									  images.save(function (err) {
						
											if (err) { console.log("error", err); return apiResponse.ErrorResponse(res, err); 
											};
											
										});

								});
							});


							});

					  });
					});

				// 	fs.readFile(dirname +"/"+ filename, 'utf-8', function(err, content) {
				// 	  if (err) {
				// 		console.log("error",err)
				// 	  }
				// 	    console.log(err+content);
				//     });
					});
				   });
				});
				return apiResponse.successResponseWithData(res,"Dumped.");
			
		} catch (err) {
			console.log("error:",err);
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.displayImages = [
	(req, res) => {
		// console.log("api requested", req.params);
		// var query = {userAddress: req.params.userAddress,typeNFT: req.params.typeNFT, category: req.params.category };
		var query = {_id:'62895714b83736b5823af897'}
		Images.findById(query).then(user => {
	//		console.log(user);
	console.log("USER",user);
			fs.writeFile('./output', user.Image, function(err, result) {
				if(err) console.log('error', err);
			  });

		});
		return apiResponse.successResponse(res,"Account confirmed success.");

	}
];