const { code: { BAD_REQUEST } } = require('../utils');
const { BlogPost } = require('../models');

const max = (array) => array.reduce((a, b) => {
  if (a > b) return a;
  return b;
});

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body;

  // const max = Math.max.apply(Math, categoryIds);
  const maxId = max(categoryIds);

  const category = await BlogPost.findOne({ where: { id: maxId } });
  if (!category) return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });

  next();
};

module.exports = validateCategory;
