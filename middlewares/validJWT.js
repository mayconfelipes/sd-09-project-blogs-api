const invalidData = require('../utils/invalidData');
const verifyToken = require('./verifyToken');

const UNAUTHORIZED = 401;

const validJWT = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw invalidData('Token not found', UNAUTHORIZED);

  const validVerifyToken = verifyToken(token);

  if (validVerifyToken.message) throw invalidData(validVerifyToken.message, UNAUTHORIZED);
  
  const { id, displayName, email } = validVerifyToken;

  req.user = {
    id,
    displayName,
    email,
  };
  next();
};

module.exports = validJWT;