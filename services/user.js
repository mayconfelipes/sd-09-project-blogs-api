const { User } = require('../models');
const { validateError, jwtResponse } = require('../middlewares/validateUser');

const serviceGetAll = async () => {
  const getUsers = await User.findAll({ raw: true });
  return (getUsers);
};

const serviceGetUserById = async (id) => {
  const getById = await User.findOne({ where: { id } });
  if (!getById) return validateError(404, 'User does not exist');
  return getById;
};

const serviceRegisterUser = async (user) => {
  const { displayName, email, password, image } = user;
  const emailSearch = await User.findOne({ where: { email } });
  if (emailSearch) return validateError(409, 'User already registered');
  await User.create({ displayName, email, password, image });
  return jwtResponse(displayName, email);
};

const serviceLoginUser = async (credentials) => {
  const { email, password } = credentials;
  const emailSearch = await User.findOne({ where: { email, password } });
  if (!emailSearch) return validateError(400, 'Invalid fields'); 
  const token = await jwtResponse(emailSearch.dataValues.displayName, email);
  if (emailSearch) return { token };
};

module.exports = {
  serviceRegisterUser,
  serviceLoginUser,
  serviceGetAll,
  serviceGetUserById,
};