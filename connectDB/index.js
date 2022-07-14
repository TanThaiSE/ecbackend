const mysql = require('mysql');
const config = require('../config/database.json');

// Not very sure if this part is needed.
const db = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.pass,
	database: config.db,
});

module.exports = db;
