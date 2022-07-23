const express = require('express');
const router = express.Router();

const productController = require('./product.controller');

router.get('/serchProduct/:id', productController.getDetailProduct);

router.post('/addProduct', productController.addProduct);

router.post('/deleteProduct/:id',productController.deleteProduct)

router.post('/serchProductByName', productController.serchProductByName);

module.exports = router;