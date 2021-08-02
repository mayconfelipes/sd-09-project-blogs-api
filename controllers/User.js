const rescue = require('express-rescue');
const User = require('../services/User');

const registerUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await User.createUser(displayName, email, password, image);

  if (newUser.message) return next(newUser);

  return res.status(201).json(newUser);
});

module.exports = {
  registerUser,
};
