require('dotenv/config');
const jwt = require('jsonwebtoken');

const STATUS_401 = 401;

const isValidToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
    .status(STATUS_401)
    .json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (err) {
    return res
    .status(STATUS_401)
    .json({ message: 'Expired or invalid token' });
  }
};

module.exports = isValidToken;