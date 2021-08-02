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
    // console.log(decoded, 'decoded ');
    const user = await User.findOne({ where: { email: decoded.data.email } });
    // console.log('USER USER USER', user);
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
    req.userId = user.dataValues.id;
    // console.log('ID ID ID', req.userId);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}; 