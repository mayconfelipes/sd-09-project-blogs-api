require('dotenv/config');
const jwt = require('jsonwebtoken');

module.exports = (data) => {
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const { password, ...userInfo } = data;

  const token = jwt.sign({ data: userInfo }, process.env.JWT_SECRET, jwtConfig);

  return token;
};