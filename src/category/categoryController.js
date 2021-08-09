const CategoryService = require('./categoryService');

const create = async (req, res) => {
  const { name } = req.body;
  const newCategory = await CategoryService.create(name);
  return res.status(201).json(newCategory);
};

// const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   const { error, token } = await UserService.login({ email, password });
//   if (error) return next(error);
//   return res.status(200).json({ token });
// };

// const getAll = async (_req, res) => {
//   const users = await UserService.getAll();
//   return res.status(200).json(users);
// };

// const getById = async (req, res, next) => {
//   const { id } = req.params;
//   const user = await UserService.getById(id);
//   if (user.error) return next(user.error);
//   return res.status(200).json(user);
// };

module.exports = {
  create,
  // login,
  // getAll,
  // getById,
};
