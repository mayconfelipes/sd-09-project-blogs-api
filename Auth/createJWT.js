const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env || 'evaluetor';

module.exports = (user) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, SECRET_KEY, jwtConfig);
  return token;
};