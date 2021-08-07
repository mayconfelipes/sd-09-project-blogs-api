const { BlogPost } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  const post = await BlogPost.create({ title, content, categoryIds, userId });

  return post;
};

module.exports = {
  create,
};
