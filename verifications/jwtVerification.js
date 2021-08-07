require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtVerification = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: 'Token not found' });
  }
  try {
    const userData = jwt.verify(token, secret);
    req.user = userData.email;
    return next();
  } catch (error) {
    return next({ status: 401, message: 'Expired or invalid token' });
  }
};

module.exports = jwtVerification;
