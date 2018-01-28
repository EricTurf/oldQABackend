import { head } from 'ramda';
import { connection, userData, emailSender, knex } from '../../../helpers';

export const compileInterview = (req, res) => {
    const { firstName, lastName, data } = req.body;
    const { interviewId } = req.params;
    const subject = `Interview conducted by ${firstName} ${lastName}`;
    const message = data.reduce((acc, data, index) => {
        return (acc += `Question ${index + 1}: ${
            data['question']
        } \nAnswer ${index + 1}: ${data['answer']} \n`);
    }, '');
    knex('interviews')
        .where('interviewId', interviewId)
        .select('owner')
        .then(rows => {
            const { owner } = head(rows);
            owner &&
                emailSender(owner, subject, message)
                    .then(() => {
                        res.json({
                            success: true,
                            message: 'Your interview has been submitted',
                        });
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'error sending your interview by email',
                        });
                    });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'database error',
            });
        });
};
