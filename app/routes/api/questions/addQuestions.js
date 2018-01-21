import mysql from 'mysql';
import { connection } from '../../../helpers';

export const addQuestions = (req, res) => {
  var obj = req.body;

  if (obj[0].question == null || obj[0].question == '') {
    res.json({
      success: false,
      message:
        'One of the question fields was left blank. Please insert a question(s)'
    });
  } else {
    var query = 'INSERT INTO ??(??) VALUES (?)';
    var table = ['interviewq', 'question', obj[0].question];
    query = mysql.format(query, table);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({
          success: false,
          Message: 'Error executing MySQL query'
        });
      } else {
        res.json({
          success: true,
          message: 'we have added your question(s).'
        });
      }
    }); // end of connection.query
  }
};
