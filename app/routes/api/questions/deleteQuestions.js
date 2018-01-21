import mysql from 'mysql';
import { connection } from '../../../helpers';

export const deleteQuestions = (req, res) => {
  if (req.params.id == null || req.params.id == '') {
    res.json({
      success: false,
      message: 'No question selected for deletion'
    });
  } else {
    var query = 'DELETE FROM ?? WHERE??=?';
    var table = ['interviewq', 'id', req.params.id];
    query = mysql.format(query, table);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({
          success: false,
          message: 'Error executing MySQL query'
        });
      } else {
        res.json({
          success: true,
          message: 'Succesfully deleted question(s)'
        });
      }
    }); //end of connection.query
  }
};
