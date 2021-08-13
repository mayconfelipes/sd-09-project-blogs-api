const { PostsCategories } = require('../models');

const createPostCategory = async (post) => {
  const newPost = await PostsCategories.create(post);
  return newPost;
};

module.exports = { createPostCategory };