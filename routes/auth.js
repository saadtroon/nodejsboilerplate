var express = require("express");
const AuthController = require("../controllers/AuthController");
const ImagesController = require("../controllers/ImagesController");
var router = express.Router();



router.post("/dataDumping", AuthController.dataDumping);
router.get("/getFarms/userAddress/:userAddress/typeNFT/:NFTType/category/:category", AuthController.getFarms);
router.post("/addCategory", AuthController.addCategory);
router.post("/saveImages", ImagesController.saveImages);
router.get("/displayImages",ImagesController.displayImages);

module.exports = router;