const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = (data) => {
  const jwtConfig = {
    expiresIn: '30min',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = tokenGenerator;
