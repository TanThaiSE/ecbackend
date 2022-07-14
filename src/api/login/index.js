const express = require('express');
const router = express.Router();

const loginController = require('./login.controller');

// routing goes here
router.post('/signInLocal', loginController.signInLocal);

router.post('/forgotPassword',loginController.forgotPassword);

router.post('/getNewPassword',loginController.getNewPassword);
//
module.exports = router;