const { Category } = require('../models');

// const findByEmail = async (email) => User.findOne({ where: { email } });

const create = async (name) => Category.create({ name });

const getAll = async () => Category.findAll();

// const login = async ({ email, password }) => {
//   const user = await findByEmail(email);
//   const invalidLoginData = !user || password !== user.dataValues.password;
//   if (invalidLoginData) return { error: { type: 'invalidLoginData' } };
//   const token = auth.createToken({ displayName: user.dataValues.displayName, email });
//   return { token };
// };

// const getById = async (id) => {
//   const user = await User.findByPk(id);
//   if (!user) return { error: { type: 'userDoesNotExist' } };
//   return user;
// };

module.exports = {
  create,
  getAll,
  // login,
  // getById,
};
