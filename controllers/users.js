const { User } = require('../models');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await User.create({ displayName, email, image });

  return res.status(201).json(newUser);
};