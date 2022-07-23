const mysql = require('mysql');
const config = require('../config/database.json');

// Not very sure if this part is needed.
const db = mysql.createConnection({
	host: config.host,
	user: config.user,
	port:config.port,
	password: config.password,
	database: config.database,

});

module.exports = db;
