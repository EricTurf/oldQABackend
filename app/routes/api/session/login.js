import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { head } from 'ramda';

import { connection, knex, createToken } from '../../../helpers';

export const login = (req, res) => {
    const { email, password } = req.body;
    knex('users')
        .where('email', email)
        .then(rows => {
            const { password: hashedPassword } = head(rows);
            bcrypt
                .compare(password, hashedPassword)
                .then(match => {
                    if (match) {
                        res.json({
                            success: true,
                            message: 'Login succesful',
                            token: createToken({ email }),
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Wrong email or password',
                        });
                    }
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: 'Error parsing your password',
                    });
                });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'MySQL error',
            });
        });
};
