import { knex } from '../../../helpers';

export const addQuestions = (req, res) => {
    const { questions } = req.body;

    questions &&
        knex
            .insert(questions)
            .into('interviewq')
            .then(() => {
                res.json({
                    success: true,
                    message: 'Questions added to the interview',
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'An error has occured.',
                });
            });

    res.json({
        success: false,
        message: 'Please enter questions',
    });
};
