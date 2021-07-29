require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (userInfo) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { password, ...otherInfo } = userInfo;
  const token = jwt.sign({ data: otherInfo }, process.env.JWT_SECRET, jwtConfig);

  return token;
};
