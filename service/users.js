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

const getById = async (id) => {
  const response = await Users.findOne({ where: { id } });
  if (!response) {
    const error = {
      code: 404,
      message: 'User does not exist',
    };
    throw error;
  }
  const { password: _, ...user } = response.dataValues;
  return user;
};

module.exports = {
  createNewUser,
  getAll,
  getById,
};
