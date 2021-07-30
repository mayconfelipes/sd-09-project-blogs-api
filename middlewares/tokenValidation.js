const jwt = require('jsonwebtoken');
const { errorHandling } = require('../utils');

const secret = process.env.JWT_SECRET;

const tokenValidation = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw errorHandling(401, 'missing auth token');
  }

  try {
    const payload = jwt.verify(token, secret);

    const { _id: id } = payload;

    req.userId = id;
  } catch (_error) {
    throw errorHandling(401, 'jwt malformed');
  }

  next();
};

module.exports = {
  tokenValidation,
};