import mysql from 'mysql';
import { connection, userData, EmailSender } from '../../../helpers';

export const compileInterview = (req, res) => {
  userData(req.params.refId, (err, email) => {
    if (err) {
      res.json({
        success: false,
        message:
          'Could not retrieve the proper e-mail assosiated to this interview!'
      });
    } else if (email) {
      var obj = req.body;
      var subject =
        'Interview conducted by ' + req.params.fname + ' ' + req.params.lname;

      var msg = '';
      for (var i = 0; i < obj.length; i++) {
        msg += 'Question ' + (i + 1) + ': ' + obj[i].question + '\n';
        msg += 'Answer ' + (i + 1) + ': ' + obj[i].answer + '\n';
      }
      EmailSender(email, subject, msg, err => {
        if (err) {
          res.json({
            success: false,
            message: err
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully submitted interview!'
          });
        }
      });
    }
  });
};
