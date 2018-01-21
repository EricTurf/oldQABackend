import { TokenValidator } from '../../../helpers';

export const getUserInfo = (req, res) => {
  var token = req.body.token || req.body.query || req.headers['x-access-token'];
  if (token) {
    TokenValidator(token, (err, vToken) => {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } else {
        res.json({
          success: true,
          message: 'Token validated',
          username: vToken.username
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: 'no token was provided.'
    });
  }
};
