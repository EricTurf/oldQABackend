import { knex } from '../../../helpers';

export const deleteQuestions = (req, res) => {
    const { id } = req.params;

    if (!validateId) {
        res.json({
            success: false,
            message: 'No question selected for deletion',
        });
    } else {
        knex('interviewq')
            .where('id', id)
            .del()
            .then(() => {
                res.json({
                    success: true,
                    message: 'Succesfully deleted question',
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Error executing MySQL query',
                });
            });
    }
};
const validateId = id => {
    return id !== null || id !== '' || id !== undefined;
};
