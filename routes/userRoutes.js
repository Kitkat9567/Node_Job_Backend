const express = require('express');
const { createNewUser } = require('../controller/userController');
const router = express.Router();


router.post("/createUser",createNewUser);

module.exports = router;