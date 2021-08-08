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

async function getUsers(token) {
  userValidations.validateToken(token);
  const users = await User.findAll();
  const response = users.map((user) => {
    const { dataValues } = user;
    delete dataValues.password;
    return dataValues;
  });
  return { status: 200, response };
}

async function getUserById(id, token) {
  userValidations.validateToken(token);
  const user = await User.findOne({ where: { id } });
  userValidations.validateUser(user);
  delete user.dataValues.password;
  return { status: 200, response: user.dataValues };
}

module.exports = {
  addUser,
  getUsers,
  getUserById,
};
