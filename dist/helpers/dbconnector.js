'use strict';

/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql'); //load the mysql module
var connection = mysql.createPool({ //function to connect to the db
	host: 'us-cdbr-iron-east-05.cleardb.net',
	user: 'b0d4782ac235fa',
	password: 'e9eaa8cc',
	database: 'heroku_1458a3842f31492'
});
module.exports = connection; //export the connection function
//# sourceMappingURL=dbconnector.js.map