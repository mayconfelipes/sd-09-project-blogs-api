const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'secret';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ displayName: decoded.data });
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token', erro: err.message,
    });
  }
};

module.exports = validateToken;
