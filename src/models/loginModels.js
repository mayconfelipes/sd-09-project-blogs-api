const { User } = require('../../models');

const loginUser = async ({ email, password }) => {
  const myUser = await User.findOne({ where: { email, password } });

  return myUser;
};

module.exports = {
  loginUser,
};