var express = require("express");
const AuthController = require("../controllers/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.post("/dataDumping", AuthController.dataDumping);
router.get("/getFarms/userAddress/:userAddress/NFTType/:NFTType/Category/:Category", AuthController.getFarms);
router.post("/addCategory", AuthController.addCategory);

module.exports = router;