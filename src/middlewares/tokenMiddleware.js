require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const noToken = { message: 'Token not found' };
const invalidToken = { message: 'Expired or invalid token' };

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json(noToken);

    const { email } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { email } });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json(invalidToken);
  }
};

module.exports = validateToken;