const { Categories } = require('../models');
/* este projeto tem participação  da trinca de 9: Joao Vitor Joao Pedro */
const chekTittle = (title) => {
  if (!title) {
    return '"title" is required';
  }

  return false;
};

const chekContent = (content) => {
  if (!content) {
    return '"content" is required';
  }

  return false;
};

const validateCategoryIds = (categoryIds) => {
  if (!categoryIds) {
    return '"categoryIds" is required';
  }

  return false;
};

const categoriePostVal = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const validation = chekTittle(title) || chekContent(content)
    || validateCategoryIds(categoryIds) || false;

  if (validation) {
    return res.status(400).json({ message: validation });
  }

  next();
};

const categorieVal = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Categories.findAll();

  const idsFromCategories = categories.map(({ id }) => id);

  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!idsFromCategories.includes(categoryIds[i])) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
  }

  next();
};

module.exports = { 
  categoriePostVal,
  categorieVal,
 };
