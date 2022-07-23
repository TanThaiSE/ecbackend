const db = require('../../executeDatabase');

exports.getDetailAdmin = (id) => db.execute(
    "SELECT username, thumbnail,role"
    + " FROM User U"
    + `WHERE U.id ='${id}' `
)

exports.getUserProfile = (id) =>db.execute(
    "SELECT U.fullName, U.phoneNumber, U.email, T.orderDate, T.status,T.payment,O.price,O.quantity"
    + " FROM TheOrder T inner join OrderDetail O ON T.id = O.orderId inner join User U ON T.userId = U.id"
    + `WHERE T.userId ='${id}' `
)
