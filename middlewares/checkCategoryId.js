const { Category } = require('../models');

const checkCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;
  
  if (!categoryIds) {
    return res.status(400).send({ message: '"categoryIds" is required' });
  }

  const id = categoryIds[0];
  const validCategoryId = await Category.findByPk(id);
  if (!validCategoryId) return res.status(400).send({ message: '"categoryIds" not found' });
  
  return next();
};

module.exports = checkCategoryId;
