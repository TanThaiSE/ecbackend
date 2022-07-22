const db = require('../../executeDatabase');

exports.signInLocal= (username, password) => db.execute(
    `
    SELECT a.id,a.password, a.type, a.is_blocked
    FROM account a
    WHERE a.username='${username}'
    `
)


exports.register =(fullName,phoneNumber,email,password,address) => db.execute(
    `
    INSERT INTO user (fullName, phoneNumber, email, password,address,role)
    VALUES ('${fullName}', '${phoneNumber}', '${email}','${password}','${address}','1');
    `
)