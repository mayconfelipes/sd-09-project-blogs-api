require('dotenv').config();

// const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

// const secret = process.env.JWT_SECRET;

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw boom.unauthorized('missing auth token');

  try {
    // const { data } = jwt.verify(token, secret);
    // req.user = data;
  } catch (err) {
    throw boom.unauthorized('jwt malformed');
  }

  next();
};