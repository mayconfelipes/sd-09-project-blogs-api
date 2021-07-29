const { User } = require('../models');
const { JwtGenerator, CustomError } = require('../middlewares');
const UserSchema = require('../schemas/userSchema');

const requestValid = (data) => {
  const { error } = UserSchema.validate(data);
  if (error) throw new CustomError(error.details[0].message, 400);
};
const addUser = async (userInfo) => {
  requestValid(userInfo);
  try {
    const newUser = await User.create(userInfo);
    const { password, ...userInfoToken } = newUser;
    const token = JwtGenerator(userInfoToken);
    return token;
  } catch (err) {
    throw new CustomError('User already registered', 409);
  }
};

module.exports = {
  addUser,
};
