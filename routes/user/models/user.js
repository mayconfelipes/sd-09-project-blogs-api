const { User } = require('../../../models');

const saveUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const getUserByField = async (field, value) => {
  try {
    const user = await User.findOne({ where: { [field]: value } });
    return user;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const getAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const deleteUser = async (id) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

module.exports = {
  saveUser,
  getUserByField,
  getAll,
  deleteUser,
};
