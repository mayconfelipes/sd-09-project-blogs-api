const jwt = require('jsonwebtoken');
const { code } = require('../helpers/messages');
require('dotenv/config');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
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

module.exports = validateToken;