const { Users } = require('../models');

const createNewUser = async (displayName, email, password, image) => {
  const { dataValues } = await Users.create({ displayName, email, password, image });
  const { password: _, ...newUser } = dataValues;
  return newUser;
};

module.exports = {
  createNewUser,
};
