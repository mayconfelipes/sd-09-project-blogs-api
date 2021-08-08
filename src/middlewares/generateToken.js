const jwt = require('jsonwebtoken');

const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

const generateToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = { generateToken };