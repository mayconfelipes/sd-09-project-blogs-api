const { Category } = require('../models');

const checkCategoryId = (req, res, next) => {
  const { categoryIds } = req.body;
  
  if (!categoryIds) {
    return res.status(400).send({ message: '"categoryIds" is required' });
  }

  categoryIds.forEach(async (catId) => {
    const catIdExist = await Category.findByPk(catId);
    if (!catIdExist) return res.status(400).send({ message: '"categoryIds" not found' });
  });

  return next();
};

module.exports = checkCategoryId;