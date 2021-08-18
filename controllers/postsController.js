// const {  } = require('../middlewares/postsValidation');
const { newCategory } = require('../middlewares/posts');

const createCategory = async (req, res, _next) => {
  const category = req.body;
  const token = req.headers.authorization;
  const data = { category, token };

  const create = await newCategory(data);

  if (create.status) return res.status(create.status).json({ message: create.message });
  return res.status(201).json(create);
};

module.exports = {
  createCategory,
};