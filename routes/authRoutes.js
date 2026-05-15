const express = require("express");
const router = express.Router();
const { userLogin, companyLogin } = require("../controller/authController");


router.post("/loginUser",userLogin);
router.post("/loginCompany",companyLogin);

module.exports = router;