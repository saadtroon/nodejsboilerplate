var express = require("express");
const AuthController = require("../controllers/AuthController");
const ImagesController = require("../controllers/ImagesController");
var router = express.Router();



router.post("/dataDumping", AuthController.dataDumping);
router.get("/getFarms/userAddress/:userAddress/typeNFT/:NFTType/category/:category", AuthController.getFarms);
router.get("/getSigns/userAddress/:userAddress/typeNFT/:NFTType/category/:category", AuthController.getSigns);
router.post("/addCategory", AuthController.addCategory);
router.post("/saveImages", ImagesController.saveImages);
router.get("/displayImages",ImagesController.displayImages);
router.get("/updateJSON/:startLimit/:endLimit/:folderName/:ipfs", ImagesController.updateJSON);

module.exports = router;