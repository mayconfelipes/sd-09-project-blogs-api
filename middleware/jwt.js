require('dotenv/config');

const jwt = require('jsonwebtoken');

const secret = 'ahnumdigo';

const validateJWT = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;