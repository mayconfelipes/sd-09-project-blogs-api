const { PostCategory } = require('../models');

const create = async ({ postId, categoryId }) => {
  const result = await PostCategory.create({ postId, categoryId });
  return result.dataValues;
};

module.exports = {
  create,
};
