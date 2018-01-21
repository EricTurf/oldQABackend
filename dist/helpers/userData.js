'use strict';

/*Module to get user information from the mySQL database*/

var mysql = require('mysql');
var connection = require('./dbconnector');

module.exports = function (refID, callback) {
	var email;
	var query = 'SELECT * FROM ?? WHERE ?? = ?';
	var table = ["users", "refID", refID];
	query = mysql.format(query, table);
	connection.query(query, function (err, results, fields) {
		if (err) {
			callback(new Error('An SQL error has occured'));
		} else if (results > 0) {
			callback(null, results[0].email);
		} else {
			callback(new Error('No user with current refID'));
		}
	});
};
//# sourceMappingURL=userData.js.map