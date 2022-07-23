const productModel = require('./product.model');

exports.getDetailProduct= (id) => productModel.getDetailProduct(id);

exports.addProduct = (title, price,thumbnail,description,created_at,updated_at,category_id,brand,discount) =>productModel.addProduct(title, price,thumbnail,description,created_at,updated_at,category_id,brand,discount);

exports.deleteProduct = (id) =>productModel.deleteProduct(title, price,thumbnail,description,created_at,updated_at,category_id,brand,discount);
exports.serchProductByName =(name) =>productModel.serchProductByName(name);