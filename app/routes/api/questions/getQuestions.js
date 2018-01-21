import mysql from 'mysql';
import { connection } from '../../../helpers';

export const getQuestions = (req, res) => {
  var query = 'SELECT * FROM ??';
  var table = ['interviewq'];
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
        Questions: rows
      });
    }
  }); // end of connection.query
};
