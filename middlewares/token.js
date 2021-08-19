require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const config = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (email) => {
  const token = jwt.sign({ user: { email } }, SECRET, config);
  return token;
};

module.exports = { createToken };
