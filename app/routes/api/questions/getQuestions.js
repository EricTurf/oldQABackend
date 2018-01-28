import mysql from 'mysql';
import { knex } from '../../../helpers';

export const getQuestions = (req, res) => {
    const { interviewId } = req.params;

    interviewId &&
        knex
            .select('question')
            .from(interviewId)
            .then(rows => {
                res.json({
                    success: true,
                    questions: rows,
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Error executing MySQL query',
                });
            });
};
