const { User } = require('../models');
const token = require('../helpers/createToken');

// lint reclamou do await, imagino que como ele esta na mesma linha e é somente um
const findByEmail = async (email) =>
  User.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });

const findByLogin = async (email, password) => {
  const user = await User.findOne(
    { where: { email, password } },
    { attributes: { exclude: ['password'] } },
  );
  return user;
};
const createUser = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image })
    .then((newUser) => newUser.dataValues)
    .catch((error) => error);

  return token.createToken(user);
};

const createTokenForLogin = (user) => token.createToken(user);

const getUsersAll = async () => 
  User.findAll({}, { attributes: { exclude: ['password', 'createAt', 'updateAt'] } });
  
  const findUserById = async (id) =>
  User.findOne({ where: { id } }, { exclude: ['password', 'createAt', 'updateAt'] });

  module.exports = { 
  findByEmail,
  createUser,
  findByLogin,
  createTokenForLogin,
  getUsersAll,
  findUserById,
};