const { User } = require('../models');
const createToken = require('../helpers/createToken');

// lint reclamou do await, imagino que como ele esta na mesma linha e é somente um
const findByEmail = async (email) =>
  User.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });
  
const createUser = (displayName, email, password, image) => {
    User.create({ displayName, email, password, image })
  .then((newUser) => createToken(newUser))
  .catch((error) => error);
};

  module.exports = { 
  findByEmail,
  createUser,
};