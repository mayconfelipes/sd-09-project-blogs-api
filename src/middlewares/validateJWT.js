const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
    req.userId = decoded.data.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}; 