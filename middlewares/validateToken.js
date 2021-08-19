const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const displayName = decoded.data;
    const user = await User.findOne({ where: { displayName } });
    const userID = user.dataValues.id;
    if (!user) { return res.status(401).json({ message: 'User not found' }); }
    req.user = userID;
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  } 
  next();
};

module.exports = validateToken;
