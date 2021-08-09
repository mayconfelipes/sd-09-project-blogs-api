const { BlogPost, Category } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  const categories = await Category.findAll();

  const existingCategoriesIds = categories.map(({ dataValues }) => dataValues.id);

  const checkCategories = categoryIds.every((id) => {
    const check = existingCategoriesIds.includes(id);
    return check;
  });

  if (!checkCategories) {
    throw Object.assign(
      new Error('\"categoryIds"\ not found'),
      { code: 'badRequest' },
   );
  };

  const post = await BlogPost.create({ title, content, categoryIds, userId });

  return post;
};

module.exports = { 
  create,
};
