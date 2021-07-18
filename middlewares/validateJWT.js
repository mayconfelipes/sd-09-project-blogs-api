const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
 return res.status(UNAUTHORIZED)
    .json({ message: 'Token not found' }); 
}

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(NOT_FOUND).json({ message: 'User not found' });
    req.user = { displayName: user.displayName, email: decoded.email };

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;