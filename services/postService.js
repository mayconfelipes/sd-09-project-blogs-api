const { Post, Category, User, PostCategory } = require('../models');

const createPost = async (userId, { title, categoryIds, content }) => {
  const categories = categoryIds.map(async (id) => Category.findByPk(id));
  const resultPromiseCategories = await Promise.all(categories); // resolve o array de promise

  const errorMessage = {
    error: {
      code: 'categoryIdsNotFound',
      message: '"categoryIds" not found',
    },
  };

  if (resultPromiseCategories.includes(null)) return errorMessage;

  const post = await Post.create({ userId, title, content });

  delete post.dataValues.published;
  delete post.dataValues.updated;

  const postId = post.dataValues.id;

  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ categoryId, postId });
  });

  return post;
};

const getAll = async () => {
  const posts = await Post
    .findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] });
  return posts;
};

module.exports = {
  getAll,
  createPost,
};