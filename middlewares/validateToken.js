const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const validToken = jwt.verify(token, secret);
  if (!validToken) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  req.user = validToken;
  return next();
};

module.exports = validateToken;