const { Category } = require('../models');
const { validateNameFormat } = require('../services/CategoriesServices');

const InsertCategory = async (req, res) => {
  const { body } = req;
  const { name } = body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  const validate = await validateNameFormat(body);
  if (validate !== true) return res.status(400).json({ message: '"name" is required' });

  const inserted = await Category.create({ ...body });

  return res.status(201).json(inserted);
};

module.exports = InsertCategory;
