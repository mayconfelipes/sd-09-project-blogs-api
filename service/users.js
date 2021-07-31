const { Users } = require('../models');

const createNewUser = async (displayName, email, password, image) => {
  const { dataValues } = await Users.create({ displayName, email, password, image });
  const { password: _, ...newUser } = dataValues;
  return newUser;
};

const getAll = async () => {
  const response = await Users.findAll({ attributes: { exclude: ['password'] } });
  return response;
};

module.exports = {
  createNewUser,
  getAll,
};
