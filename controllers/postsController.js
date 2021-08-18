// const {  } = require('../middlewares/postsValidation');
const { newCategory, getCategories } = require('../middlewares/posts');

const createCategory = async (req, res, _next) => {
  const category = req.body;
  const token = req.headers.authorization;
  const data = { category, token };

  const create = await newCategory(data);

  if (create.status) return res.status(create.status).json({ message: create.message });
  return res.status(201).json(create);
};

const getAllCategories = async (req, res, _next) => {
  const token = req.headers.authorization;

  const categoriesList = await getCategories(token);

  if (categoriesList.status) {
    return res.status(categoriesList.status)
    .json({ message: categoriesList.message });
  }

  return res.status(200).json(categoriesList);
};

module.exports = {
  createCategory,
  getAllCategories,
};