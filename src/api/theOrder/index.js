const express = require('express');
const router = express.Router();

const theOrderController = require('./theOrder.controller');


router.post('/addOrder', theOrderController.addOrder);
router.post('/deleteOrder/:id', theOrderController.addOrder);

module.exports = router;