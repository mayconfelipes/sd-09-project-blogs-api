const { User } = require('../../models');
const { emailRegisteredError } = require('../../util/errorsMessages');

const createUser = async (user) => {
  try {
    const result = await User.create({ ...user });
    return result.dataValues;
  } catch (error) {
    throw emailRegisteredError;
  }
};

const findUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ where: { email } });
    return result.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const allUsers = async () => {
  try {
    const result = await User.findAll();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findUserById = async (id) => {
  try {
    const result = await User.findByPk(id);
    // const result = await User.findOne({ where: { id } });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteUserMe = async (id) => {
  try {
    await User.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  allUsers,
  findUserById,
  deleteUserMe,
};
