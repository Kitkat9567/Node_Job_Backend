const express = require("express");
const router = express.Router();
const { userLogin } = require("../controller/authController");


router.post("/loginUser",userLogin);

module.exports = router;