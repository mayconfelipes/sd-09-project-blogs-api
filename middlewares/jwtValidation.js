const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const rescue = require('express-rescue');

const jwtValidate = rescue(async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    throw boom.unauthorized('Token not found');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (decoded)next();
  } catch (e) {
   throw boom.unauthorized('Expired or invalid token');
  }
});
module.exports = {
    jwtValidate,
};
