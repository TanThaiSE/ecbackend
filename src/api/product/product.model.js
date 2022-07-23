const db = require('../../executeDatabase');

exports.getDetailProduct = (id) => db.execute(
   
    `SELECT *
    FROM product P
    where P.id ='${id}'
    `
   
)
exports.addProduct  = (title, price,thumbnail,description,created_at,updated_at,category_id,brand,discount) =>db.execute(
    `
    INSERT INTO product (title, price, thumbnail,description,created_at,updated_at,category_id,brand,discount)
    VALUES ('${title}', '${price}', '${thumbnail}','${description}','${created_at}','${updated_at}','${category_id}','${brand}','${discount}');
    `
)

exports.deleteProduct = (title, price,thumbnail,description,created_at,updated_at,category_id,brand,discount) =>db.execute(
    `
    DELETE FROM Product P WHERE P.id = '${id}';
    `
)

exports.serchProductByName =(name) => db.execute(
   
    `SELECT *
    FROM product P
    where P.title like ''%${name}%''
    `
   
)