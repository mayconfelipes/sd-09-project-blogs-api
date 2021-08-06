const jwt = require('jsonwebtoken');

const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

const generateToken = async ({ id, displayName, email }) => {
  const token = jwt.sign({ id, displayName, email }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = { generateToken };