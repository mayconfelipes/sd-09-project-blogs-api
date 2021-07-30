const { PostsCategory } = require('../sequelize/models');

const createPostsCategory = async ({ postId, categoryId }) => {
  const result = await PostsCategory.create({ postId, categoryId });

  return result;
};

module.exports = {
  createPostsCategory,
};
