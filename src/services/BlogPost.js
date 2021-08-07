const { BlogPost } = require('../models');
const { Category } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  const categories = await Category.findAll();
  const validCategoriesIds = categories.map(({ dataValues: { id } }) => id);

  categoryIds.forEach((id) => {
    if (!validCategoriesIds.includes(id)) {
      throw new Error('"categoryIds" not found');
    }
  });

  const post = await BlogPost.create({ title, content, categoryIds, userId });

  return post;
};

module.exports = {
  create,
};
