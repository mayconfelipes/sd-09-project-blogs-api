const jwt = require('jsonwebtoken');

const SECRET = 'mysupersecret';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const tokenVerify = jwt.verify(token, SECRET);
    req.user = tokenVerify;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;