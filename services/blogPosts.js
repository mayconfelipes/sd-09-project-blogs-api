const { BlogPost, User, Category } = require('../models');

const createPost = async ({ title, content, userId }) => {
  const post = await BlogPost.create({ title, content, userId });
  return post;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
    exclude: ['password'],
  });
  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
};
