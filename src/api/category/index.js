const express = require('express');
const router = express.Router();

const categoryController = require('./category.controller');

router.get('/serchCategory/:id', categoryController.getDetailCategory);



module.exports = router;