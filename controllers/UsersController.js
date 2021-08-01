const rescue = require('express-rescue');
const User = require('../services/UsersService');

const create = rescue(async (req, res) => {
  const { email, displayName, password, image } = req.body;

  const user = await User.create(email, displayName, password, image);

  return res.status(201).json(user);
});

module.exports = {
  create,
};