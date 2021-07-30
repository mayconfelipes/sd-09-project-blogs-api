const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

const ValidateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.data) return res.status(401).json({ message: 'Expired or invalid token' });
    const { email, password } = decoded.data;
    const find = await User.findOne({ where: { email, password } });
    if (!find) return res.status(401).json({ message: 'Expired or invalid token' });

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = ValidateToken;
