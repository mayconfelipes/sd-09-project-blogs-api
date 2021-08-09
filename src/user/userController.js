const UserService = require('./userService');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error, token } = await UserService.create({ displayName, email, password, image });
  if (error) return next(error);
  return res.status(201).json({ token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { error, token } = await UserService.login({ email, password });
  if (error) return next(error);
  return res.status(200).json({ token });
};

module.exports = {
  create,
  login,
};