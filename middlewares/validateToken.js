const { verifyToken } = require('../auxiliarFunctions/jwtFunctions');

const tokenValidation = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Token not found');
    err.status = 401;
    return next(err);
  }
  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (err) {
    err.status = 401;
    err.message = 'Expired or invalid token';
    next(err);
  }
};

module.exports = tokenValidation;
