const db = require('../../executeDatabase');

exports.addOrder = (orderDate, status, userId, payment) => db.execute(
    `
    INSERT INTO Theorder (orderDate, status, userId,payment)
    VALUES ('${orderDate}', '${status}', '${userId}','${payment}');

    `
)

exports.deleteOrder = (id) =>db.execute(
    `
    DELETE FROM Theorder T WHERE T.id = '${id}';
    `
)