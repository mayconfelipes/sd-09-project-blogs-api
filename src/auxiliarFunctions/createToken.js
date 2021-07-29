const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (data) => {
  const jwtConfig = {
    expiresIn: '10h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = createToken;
