const { BlogPost, Category, User } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  const categories = await Category.findAll();

  const existingCategoriesIds = categories.map(({ dataValues }) => dataValues.id);

  const checkCategories = categoryIds.every((id) => {
    const check = existingCategoriesIds.includes(id);
    return check;
  });

  if (!checkCategories) {
    throw Object.assign(
      new Error('"categoryIds" not found'),
      { code: 'badRequest' },
   );
  }

  const post = await BlogPost.create({ title, content, categoryIds, userId });

  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { through: [] } },
    ],
  });

  return posts;
};

module.exports = { 
  create,
  getAll,
};
