import mysql from 'mysql';
import { knex } from '../../../helpers';

export const getQuestions = (req, res) => {
    knex
        .select('question')
        .select('id')
        .from('interviewq')
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
