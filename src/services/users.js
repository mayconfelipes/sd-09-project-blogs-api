const { User } = require('../models');
const getToken = require('../middlewares/generateToken');
const { userExists } = require('../middlewares/validators');
const schemas = require('../middlewares/schemas');
const validate = require('../middlewares/validators');

const create = async (userInfo) => {
  const { email } = userInfo;
  try {
    await schemas.userSchema(userInfo);
    await userExists(email);
  } catch (error) {
    return error;
  }
  const newUser = await User.create(userInfo);
  const { token } = await getToken.generateToken(newUser);
  return {
    status: 201,
    token,
  };
};

const login = async (loginData) => {
  const { email } = loginData;
  try {
    await schemas.loginSchema(loginData);
    await validate.login(email);
  } catch (error) {
    return error;
  }
  const { token } = await getToken.generateToken(email);
  return {
    status: 200,
    token,
  };
};

const getAll = async () => {
  const usersList = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return {
    status: 200,
    usersList,
  };
};

const token = async (req, res, next) => {
  try {
     const userRegister = await validate.token(req.headers);
     req.user = userRegister;
     next();
    } catch (err) {
      const { message } = err;
      res.status(401).json({ message });
    }
};

module.exports = { create, login, getAll, token };