require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtValidate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { dataValues: { email } } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { email } });
    
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
    
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  jwtValidate,
};