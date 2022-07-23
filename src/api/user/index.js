const express = require('express');
const router = express.Router();

const userController = require('./user.controller');

router.get('/adminProfile/:id', userController.getDetailAdmin);

router.get('/userProfile/:id', userController.getUserProfile);





module.exports = router;