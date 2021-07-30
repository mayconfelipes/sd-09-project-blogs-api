const { User } = require('../models');
const { JwtGenerator, CustomError, RequestValidator } = require('../middlewares');
const UserSchema = require('../schemas/userSchema');

const addUser = async (userInfo) => {
  RequestValidator(UserSchema, userInfo);
  try {
    const newUser = await User.create(userInfo);
    const { password, ...userInfoToken } = newUser;
    const token = JwtGenerator(userInfoToken);
    return token;
  } catch (err) {
    throw new CustomError('User already registered', 409);
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return allUsers;
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
};

const getUserById = async (id) => {
  let userById;
  try {
    userById = await User.findByPk(id);
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
  if (!userById) throw new CustomError('User does not exist', 404);
  return userById;
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
};
