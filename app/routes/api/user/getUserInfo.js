import { validateToken } from '../../../helpers';

export const getUserInfo = (req, res) => {
    const { token } = req.params;

    token &&
        validateToken(token)
            .then(({ email }) => {
                res.json({
                    success: true,
                    email,
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    error: err,
                });
            });

    res.json({
        success: false,
        message: 'no token was provided.',
    });
};
