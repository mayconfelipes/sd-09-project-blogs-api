const { User } = require('../models');

const InsertUser = async (req, res) => {
  const { body, token } = req;

  await User.create({ ...body });

  res.status(201).json({ token });
};

module.exports = InsertUser;
