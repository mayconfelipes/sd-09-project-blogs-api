const { User } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  return user;
};

// const login = async ({ email, password }) => {
//   const { error } = validateLogin.validate({ email, password });
//   if (error) return { error: 'All fields must be filled', status: 401 };
//   const userByEmail = await userModel.getUserByEmail(email);
//   if (!userByEmail.length) return { error: 'Incorrect username or password', status: 401 };

//   if (password !== userByEmail[0].password) {
//     return { error: 'Incorrect username or password', status: 401 };
//   }
//   const { _id } = userByEmail[0];
//   return {
//     _id,
//     role: userByEmail[0].role,
//   };
// };

module.exports = {
  create,
  // login,
};