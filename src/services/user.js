const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = process.env.JWT_SECRET;

const JWTgen = (userInfo) => {
  const { password, ...payload } = userInfo;
    const jwtConfig = {
      expiresIn: '12h',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const createNewUser = async (userInfo) => {
  // console.log(userInfo);
  const { displayName, email, password, image } = userInfo;
  const token = JWTgen(userInfo);
  await User.create({ displayName, email, password, image });
  return token;
};

const logUser = async (userInfo) => JWTgen(userInfo);

module.exports = {
  createNewUser,
  logUser,
};