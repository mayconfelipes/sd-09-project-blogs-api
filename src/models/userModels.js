const { User } = require('../../models');

const findUserByEmail = async (email) => {
  const myUser = await User.findOne({ where: { email } });

  return myUser;
};

const postNewUser = async (userData) => {
  const foundUser = await findUserByEmail(userData.email);

  if (foundUser) return;

  const newUser = await User.create(userData);
  return newUser;
  // console.log(newUser);
};

const getAllUsers = async () => {
  const allUsers = User.findAll();

  return allUsers;
};

module.exports = {
  postNewUser,
  getAllUsers,
};
