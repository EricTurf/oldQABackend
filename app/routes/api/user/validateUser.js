import mysql from 'mysql';
import { connection, TokenValidator } from '../../../helpers';

export const validateUser = (req, res) => {
  var tempToken = req.params.token;
  if (tempToken) {
    TokenValidator(tempToken, (err, vToken) => {
      if (err) {
        res.json({
          success: false,
          message: 'Invalid link or your activation link is expired'
        });
      } else {
        var query = 'UPDATE ?? SET ??=? WHERE ?? = ?';
        var table = ['users', 'activated', true, 'email', vToken.email];
        query = mysql.format(query, table);
        connection.query(query, (err, results, fields) => {
          if (err) {
            res.json({
              success: false,
              message: 'SQL error'
            });
          } else {
            res.json({
              success: true,
              message: 'Your account has been validated'
            });
          }
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: 'No token received'
    });
  }
};
