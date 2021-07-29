const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    const user = await User.findOne({ where: { email: payload.email } });
    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;