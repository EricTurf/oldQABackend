import mysql from 'mysql';
import { connection } from '../../../helpers';
import EmailValidator from 'email-validator';
import jwt from 'jsonwebtoken';

export const createUser = (req, res) => {
  if (
    req.body.email == null ||
    req.body.email == '' ||
    req.body.password == null ||
    req.body.password == ''
  ) {
    res.json({
      success: false,
      message: 'Email and/or password was left empty!'
    });
  } else if (!EmailValidator.validate(req.body.email)) {
    res.json({
      success: false,
      message: 'Invalid email address. Please enter an actual email address'
    });
  } else {
    var query = 'INSERT INTO ??(??,??) VALUES (?,?)';
    var table = [
      'users',
      'email',
      'password',
      req.body.email,
      req.body.password
    ];
    query = mysql.format(query, table);
    connection.query(query, function(err, rows) {
      if (err) {
        res.json({
          success: false,
          message: 'SQL error' + err
        });
      } else {
        var tempToken = jwt.sign(
          {
            email: req.body.email
          },
          'ilikepie',
          {
            expiresIn: '1h'
          }
        );
        if (tempToken) {
          var subject =
            'Activation link for your QuestionApp account: ' + req.body.email;
          var msg =
            'To activate your account, please click on the following link: https://radiant-lake-20483.herokuapp.com/activateUser/' +
            tempToken;
          EmailSender(req.body.email, subject, msg, function(err) {
            if (err) {
              res.json({
                success: false,
                message: 'Problem encountered when sending email',
                token: tempToken
              });
            } else {
              res.json({
                success: true,
                message: 'Activation link sent!'
              });
            }
          });
        }
      }
    });
  }
};
