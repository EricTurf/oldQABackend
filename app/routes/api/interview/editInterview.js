import { createTable, addQuestions, deleteTable, knex } from '../../../helpers';

export const editInterview = (req, res) => {
    const { interviewName, questions } = req.body;
    const { deleteInterview } = req.query;
    const { interviewId } = req.params;

    if (deleteInterview && JSON.parse(deleteInterview)) {
        knex('interviews')
            .where('interviewId', interviewId)
            .del()
            .then(() => {
                deleteTable(interviewId)
                    .then(() => {
                        res.json({
                            success: true,
                            message: 'Interview successfully deleted',
                        });
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'Error deleting your interview',
                        });
                    });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Error deleting your interview',
                });
            });
    } else {
        knex('interviews')
            .where('interviewId', interviewId)
            .update({ interviewName })
            .then(() => {
                deleteTable(interviewId)
                    .then(() => {
                        createTable({ interviewId })
                            .then(() => {
                                addQuestions(questions, interviewId)
                                    .then(() => {
                                        res.json({
                                            success: true,
                                            message:
                                                'Interview successfully updated',
                                        });
                                    })
                                    .catch(err => {
                                        res.json({
                                            success: false,
                                            message:
                                                'Error updating your interview',
                                        });
                                    });
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message: 'Error updating your interview',
                                });
                            });
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'Error updating your interview',
                        });
                    });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Error updating your interview',
                });
            });
    }
};
