const { PostsCategory } = require('../models');

const create = async ({ postId, categoryId }) => {
  const result = await PostsCategory.create({ postId, categoryId });
  return result.dataValues;
};

module.exports = {
  create,
};
