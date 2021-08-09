const UserService = require('./userService');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error, token } = await UserService.create({ displayName, email, password, image });
  if (error) return next(error);
  return res.status(201).json({ token });
};

module.exports = {
  create,
};