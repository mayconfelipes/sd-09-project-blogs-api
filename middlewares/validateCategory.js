const { Categories } = require('../models');

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body; 
  if (!categoryIds || categoryIds === []) {
    return res
      .status(400).json({ message: '"categoryIds" is required' });
  }
  const category = categoryIds.map((id) => Categories.findByPk(id));
  const CategoryExists = await Promise.all(category);

  if (CategoryExists.includes(null)) {
    return res
      .status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = validateCategory;