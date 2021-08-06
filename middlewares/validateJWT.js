require('dotenv/config');

const jwt = require('jsonwebtoken');
const { code } = require('../helpers/messages');

const validateJWT = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  try {
    if (!token) {
      res.status(code.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
    next();
  } catch (error) {
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;