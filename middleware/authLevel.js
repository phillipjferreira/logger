const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (authLevel) {
  return function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
      jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
        if (error) {
          res.status(401).json({ msg: 'Token is not valid' });
        } else {
          req.user = decoded.user;
          if (decoded.user.role < authLevel) {
            res.status(401).json({ msg: 'User action not authorized' });
          } else {
            return next();
          }
        }
      });
    } catch (err) {
      console.error('something wrong with auth middleware');
      res.status(500).json({ msg: 'Server Error' });
    }
  };
};