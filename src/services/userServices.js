const { User } = require('../models');
const userValidations = require('../validations/userValidations');

async function addUser(user) {
  userValidations.validateDisplayName(user.displayName);
  userValidations.validateEmail(user.email);
  userValidations.validatePassword(user.password);
  await userValidations.validateUserExists(user.email);
  const newUser = await User.create(user);
  return { status: 201, response: newUser.dataValues };
}

module.exports = {
  addUser,
};
