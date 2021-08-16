const { BlogPost, User, Category } = require('../models');

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });
  return allPosts;
};

module.exports = getAllPosts;