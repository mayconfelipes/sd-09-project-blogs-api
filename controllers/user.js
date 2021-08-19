const UserService = require('../services/user');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image = null } = req.body;
    const { statusCode, token } = await UserService
      .create(displayName, email, password, image);
    res.status(statusCode).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { statusCode, token } = await UserService.login(email, password);
    res.status(statusCode).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  login,
};