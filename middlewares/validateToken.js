const jwt = require('jsonwebtoken');

const SECRET = 'mysupersecret';

const validateToken = (req, res, next) => {
  try {
  const token = req.headers.authorization;
  // console.log('token', token) ok;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
    const tokenVerify = jwt.verify(token, SECRET);
    const { id, email } = tokenVerify;
    req.user = {
      id,
      email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;