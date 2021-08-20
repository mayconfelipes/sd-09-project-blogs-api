const { Users } = require('../models');

const register = (user) => Users.create(user);

module.exports = {
  register,
};
