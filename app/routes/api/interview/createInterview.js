import { knex, addQuestions } from '../../../helpers';
import { generate } from 'rand-token';

export const createInterview = (req, res) => {
    const { questions, owner } = req.body;
    const { interviewName } = req.params;
    const tableName = generate(12);
    interviewName &&
        knex('interviews')
            .insert({
                interviewName,
                owner,
                interviewId: tableName,
            })
            .then(() => {
                knex.schema
                    .createTable(tableName, table => {
                        table.increments();
                        table.string('question', 1000);
                    })
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
};
