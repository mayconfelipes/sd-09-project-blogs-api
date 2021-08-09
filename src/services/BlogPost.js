const { BlogPost, Category, User } = require('../models');

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

const findAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return blogPosts;
};

module.exports = {
  create,
  findAll,
};
