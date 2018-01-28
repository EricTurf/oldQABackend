import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {
    connection,
    validateInput,
    knex,
    emailSender,
    createToken,
} from '../../../helpers';

export const createUser = (req, res) => {
    const { email, password } = req.body;

    validateInput('email', email) &&
        password &&
        bcrypt
            .hash(password, 10)
            .then(hash => {
                knex('users')
                    .insert({ email, password: hash })
                    .then(() => {
                        const token = createToken({ email });
                        const subject = `QuestionApp activation link for ${email}`;
                        const message = `To activate your account, please click on the following link: https://localhost:8080/users/validate/${token}`;
                        emailSender(email, subject, message)
                            .then(() => {
                                res.json({
                                    success: true,
                                    message:
                                        'Please check your inbox for an activation link',
                                    token,
                                });
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message:
                                        'Error sending your verification email',
                                });
                            });
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'Error adding you to the database',
                        });
                    });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Error hashing password',
                });
            });
};
