const db = require('../../executeDatabase');

exports.getDetailCategory = (id) => db.execute(
    "SELECT *"
    + " FROM category C"
    + `WHERE C.id ='${id}' `
)