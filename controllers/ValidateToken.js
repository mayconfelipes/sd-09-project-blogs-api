const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

const ValidateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
    
    await User.findOne({ email, password });
    const all = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    return res.status(200).json(all);
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  // const user = await User.findOne({ });
  // next();
};

module.exports = ValidateToken;
