const { User } = require('../models');
const token = require('../helpers/createToken');

// lint reclamou do await, imagino que como ele esta na mesma linha e é somente um
const findByEmail = async (email) =>
  User.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });
  
const createUser = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image })
    .then((newUser) => newUser.dataValues)
    .catch((error) => error);

  return token.createToken(user);
};
  module.exports = { 
  findByEmail,
  createUser,
};