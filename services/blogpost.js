const { Category } = require('../models');

const validateTitle = async (req, res, next) => {
  const { title } = req.body;

  if (title === '' || !title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  next();
};

const validateContent = async (req, res, next) => {
  const { content } = req.body;

  if (content === '' || !content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const validateCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  
  if (!categoryIds || !categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categoryIds.length !== categories.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategories,
}; 