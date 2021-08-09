const { Category } = require('../models');

// const findByEmail = async (email) => User.findOne({ where: { email } });

const create = async (name) => Category.create({ name });

// const login = async ({ email, password }) => {
//   const user = await findByEmail(email);
//   const invalidLoginData = !user || password !== user.dataValues.password;
//   if (invalidLoginData) return { error: { type: 'invalidLoginData' } };
//   const token = auth.createToken({ displayName: user.dataValues.displayName, email });
//   return { token };
// };

// const getAll = async () => User.findAll();

// const getById = async (id) => {
//   const user = await User.findByPk(id);
//   if (!user) return { error: { type: 'userDoesNotExist' } };
//   return user;
// };

module.exports = {
  create,
  // login,
  // getAll,
  // getById,
};
