require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({
      statusCode: 401,
      message: 'Token not found',
    });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    next();
  } catch (err) {
    return next({
      statusCode: 401,
      message: 'Expired or invalid token',
    });
  }
};
