const express = require('express');
const { createNewCompany } = require('../controller/companyController');
const router = express.Router();

router.post('/createComp',createNewCompany);


module.exports = router;