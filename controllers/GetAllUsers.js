const { User } = require('../models');

const GetAllUsers = async (_req, res) => {
  const all = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
  return res.status(200).json(all);
};

module.exports = GetAllUsers;
