const jwt = require('jsonwebtoken');
const { errorHandling } = require('../utils');

const secret = process.env.JWT_SECRET;

const tokenValidation = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw errorHandling(401, 'Token not found');
  }

  try {
    const payload = jwt.verify(token, secret);

    const { id } = payload;

    req.userId = id;
  } catch (_error) {
    throw errorHandling(401, 'Expired or invalid token');
  }

  next();
};

module.exports = {
  tokenValidation,
};