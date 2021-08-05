const { BlogPosts, Category, User } = require('../models');

const create = async (title, content, categoryIds, id) => {
  const newPost = await BlogPosts.create({ userId: id, title, content });

  return newPost;
};

const getAll = async () => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
    exclude: ['password'],
  });
  return posts;
};

module.exports = {
  create,
  getAll,
};