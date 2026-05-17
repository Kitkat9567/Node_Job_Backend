const express = require('express');
const { createNewUser } = require('../controller/registerController');
const router = express.Router();


router.post('/reg',createNewUser);

module.exports = router;