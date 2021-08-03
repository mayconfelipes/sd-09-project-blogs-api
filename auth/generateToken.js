const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const SECRET = process.env.JWT_SECRET;
  return jwt.sign(payload, SECRET, jwtConfig);
};

module.exports = generateToken;