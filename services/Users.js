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
    const allUsers = await User.findAll();
    return allUsers;
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
