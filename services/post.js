const { BlogPost, Category, PostsCategory } = require('../models');
const Errors = require('../util/errors');

const create = async (title, content, categoryIds, user) => {
  const categoriesPromises = categoryIds.map(async (id) => Category.findByPk(id));
  const resolvedCategories = await Promise.all(categoriesPromises);

  if (resolvedCategories.includes(null)) throw new Errors.CategoryIdNotFound();

  const userId = user.id;

  const data = await BlogPost.create({ userId, title, content });

  const { updated, published, ...post } = data.dataValues;

  const postId = post.id;

  categoryIds.forEach(async (categoryId) => {
    await PostsCategory.create({ categoryId, postId });
  });

  return post;
};

module.exports = {
  create,
};