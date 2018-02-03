import { knex, addQuestions, createTable } from '../../../helpers';
import { generate } from 'rand-token';

export const createInterview = (req, res) => {
    const { questions, owner } = req.body;
    const { interviewName, interviewId } = req.params;
    const tableName = generate(12);
    if (interviewName && questions) {
        knex('interviews')
            .insert({
                interviewName,
                owner,
                interviewId: tableName,
            })
            .then(() => {
                createTable({ interviewId, tableName })
                    .then(() => {
                        addQuestions(questions, tableName)
                            .then(() => {
                                res.json({
                                    success: true,
                                    message:
                                        'Succesfully created your interview',
                                });
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message: 'Error creating your interview',
                                });
                            });
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message:
                                'something went wrong creating your interview',
                        });
                    });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'error creating your interview',
                });
            });
    } else {
        res.json({
            success: false,
            message: 'You forgot to give us an interview name or question',
        });
    }
};
