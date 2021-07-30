require('dotenv').config();
const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;

const JwtValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    const user = data;
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  JwtValidator,
};
