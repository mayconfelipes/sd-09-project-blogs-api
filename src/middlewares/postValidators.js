const { Category } = require('../models');

const error = (status, message) => ({ status, message });

const validateTitle = async (title) => {
  if (!title) throw error(400, '"title" is required');
};

const validateContent = async (content) => {
  if (!content) throw error(400, '"content" is required');
};

const validateCategoryIds = async (categoryIds) => {
  if (!categoryIds) throw error(400, '"categoryIds" is required');
  const arr = await Category.findAll({ where: { id: categoryIds } });
  if (arr.length !== categoryIds.length) throw error(400, '"categoryIds" not found');
};

const validatePost = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  try {
    await validateTitle(title);
    await validateContent(content);
    await validateCategoryIds(categoryIds);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { validatePost };
