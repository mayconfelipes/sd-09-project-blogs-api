const rescue = require('express-rescue');
const {
  checkCategory,
  getCategory,
  createCategory,
  findCategories,
} = require('../services/categories');

const newCategory = rescue(async (req, res) => {
  const { body, body: { name } } = req;

  const { error } = checkCategory(body);
  if (error) return res.status(400).json(error.details[0]);

  const category = await getCategory(name);
  if (category) return res.status(409).json({ message: 'Category already registered' });

  const created = await createCategory({ name });
  if (created.err) return res.status(500).json({ message: created.err.message });

  return res.status(201).json(created);
});

const getCategories = rescue(async (req, res) => {
  const categories = await findCategories();
  return res.status(200).json(categories);
});

module.exports = {
  newCategory,
  getCategories,
};
