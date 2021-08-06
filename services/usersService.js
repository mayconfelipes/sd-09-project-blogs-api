const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'mysupersecret';

const createToken = (tokenUser) => {
  // criando o token
  const token = jwt.sign(tokenUser, SECRET, {
    expiresIn: '3d',
    algorithm: 'HS256',
  });
  console.log('createToken', token);
  return token;
};

const createUsers = async ({ displayName, email, password, image }) => {
  const userCreate = await User.create({ displayName, email, password, image });
  // console.log('createUsers', userCreate);

  const { password: pass, ...user } = userCreate.dataValues;
  console.log(user);

  return createToken(user);
};

module.exports = {
  createUsers,
};