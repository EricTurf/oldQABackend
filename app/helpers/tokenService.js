import jwt from 'jsonwebtoken';

const secret = 'ilikepie';

export const validateToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            decoded && resolve(decoded);
            reject(Error('Error verifying your token '));
        });
    });
};

export const createToken = data =>
    jwt.sign(data, secret, {
        expiresIn: '1h',
    });
