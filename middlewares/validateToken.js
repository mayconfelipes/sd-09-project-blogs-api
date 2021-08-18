const jwt = require('jsonwebtoken');

const secret = 'teste';
const code = require('../utils/codes');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(code.NOT_FOUND).json({ message: 'Token not found' });
  }

  try {
    const validToken = jwt.verify(token, secret);
    req.user = validToken.data;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(code.NOT_FOUND).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;