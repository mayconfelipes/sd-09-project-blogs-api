require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
    const { id, displayName, email, image } = user;
    req.user = { id, displayName, email, image };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;