const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config/database.json');

// Not very sure if this part is needed.
const db = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.pass,
	database: config.db,
});

db.query('Select 1 + 1 As solution', function (error, result, fields) {
	if (error) throw error;
		console.log('solution is', result[0].solution);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Graduation project API' });
});

module.exports = router;
