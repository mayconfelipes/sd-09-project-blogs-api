const rescue = require('express-rescue');

const { User } = require('../models');

const create = rescue(async (req, res) => {
  console.log('============createUser ==========')
  const { displayName, email, password, image } = req.body;

  const newUser = await User.create({ displayName, email, image });

  return res.status(201).json(newUser);
});

module.exports = {
  create,
};
