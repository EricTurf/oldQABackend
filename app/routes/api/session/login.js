import mysql from 'mysql';
import { connection } from '../../../helpers';
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  var query = 'SELECT * FROM ?? WHERE ?? = ?';
  var password = req.body.password;
  var table = ['users', 'email', req.body.email];
  query = mysql.format(query, table);
  connection.query(query, (err, results, fields) => {
    if (err) {
      res.json({
        success: false,
        Mesage: 'Error connecting to database'
      });
    } else {
      if (results.length > 0) {
        if (results[0].password == password) {
          var token = jwt.sign(
            {
              email: results[0].email
            },
            'ilikepie',
            {
              expiresIn: '1h'
            }
          );

          res.json({
            success: true,
            Message: 'Logged in',
            token: token
          });
        } else {
          res.json({
            success: false,
            Message: 'Invalid password'
          });
        }
      } else {
        res.json({
          success: false,
          Message: 'Invalid username and password'
        });
      }
    }
  });
};
