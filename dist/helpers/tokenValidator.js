'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(token, callback) {
    jwt.verify(token, 'ilikepie', function(err, decoded) {
        if (err) {
            callback(new Error('Error decoding token'));
        } else {
            callback(null, decoded);
        }
    });
};
//# sourceMappingURL=tokenValidator.js.map
