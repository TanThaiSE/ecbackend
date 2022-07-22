const express = require('express');
const router = express.Router();

const loginController = require('./login.controller');

// routing goes here
router.post('/signInLocal', loginController.signInLocal);


router.post('/register', loginController.register);

//
module.exports = router;