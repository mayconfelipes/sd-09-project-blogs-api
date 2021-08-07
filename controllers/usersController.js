const usersService = require('../services/usersService');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await usersService.createUser(user);
    return res.status(201).json({ token });
  } catch (err) { next(err); }
};

const loginUser = async (req, res, next) => {
  try {
    const login = req.body;
    const token = await usersService.loginUser(login);
    return res.status(200).json({ token });
  } catch (err) { next(err); }
};

module.exports = {
  createUser,
  loginUser,
};
