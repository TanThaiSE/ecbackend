const db = require('../../executeDatabase');

exports.signInLocal= (username, password) => db.execute(
    `
    SELECT a.id,a.password, a.type, a.is_blocked
    FROM account a
    WHERE a.username='${username}'
    `
)

exports.findAccount = (infoForgotPass) => db.execute(
    `
        SELECT a.id
        FROM account a
        WHERE a.email= '${infoForgotPass.email}'
    `
)
exports.findExistAccount = (idAcc) => db.execute(
    `
        SELECT a.id
        FROM account a
        WHERE a.id= '${idAcc}'
    `
)
exports.updatePassword = (password, idAcc) => db.execute(
    `
        UPDATE account SET password ='${password}' WHERE id='${idAcc}'
    `
)
