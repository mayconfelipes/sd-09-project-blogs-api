require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (payload) => {
  const { JWT_SECRET } = process.env;
  const { password, ...noPasswordPayload } = payload;

  const token = password
    ? jwt.sign(noPasswordPayload, JWT_SECRET)
    : jwt.sign(payload, JWT_SECRET);

  return token;
};
