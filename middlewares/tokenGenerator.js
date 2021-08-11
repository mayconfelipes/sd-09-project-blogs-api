const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = (data) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = tokenGenerator;