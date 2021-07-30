const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

const ValidateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
    
    await User.findOne({ email, password });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = ValidateToken;
