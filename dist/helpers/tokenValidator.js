'use strict';

var jwt = require('jsonwebtoken');

module.exports = function (token, callback) {
  console.log(token);
  jwt.verify(token, 'ilikepie', function (err, decoded) {
    if (err) {
      callback(new Error('Error decoding token'));
    } else {
      console.log(decoded);
      callback(null, decoded);
    }
  });
};
//# sourceMappingURL=tokenValidator.js.map