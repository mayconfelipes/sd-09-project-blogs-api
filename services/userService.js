const { User } = require('../models');
const createJWT = require('../utils/createJWT');
const userValidator = require('../utils/userValidator');

const addUser = async (newUser) => {
  const userValidation = await userValidator(newUser);
  // console.log(userValidation);
  if (userValidation.error) return userValidation;
  await User.create(newUser);
  return {
    token: createJWT(userValidation),
  };
};

module.exports = {
  addUser,
};