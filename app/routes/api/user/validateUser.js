import mysql from 'mysql';
import { connection, validateToken, knex } from '../../../helpers';

export const validateUser = (req, res) => {
    const { token } = req.params;

    token &&
        validateToken(token)
            .then(({ email }) => {
                knex('users')
                    .where('email', '=', email)
                    .update({ activated: true })
                    .then(() => {
                        res.json({
                            success: true,
                            message: 'Successfully activated your account!',
                        });
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'Error activating your account',
                        });
                    });
            })
            .catch(err => {
                res.json({
                    success: false,
                    error: err,
                });
            });
};
