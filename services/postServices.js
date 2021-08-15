const { BlogPost } = require('../models');

const createPost = async (postData) => {
  const newPost = await BlogPost.create(postData);

  const { updated, published, ...createdPost } = newPost.dataValues;
  console.log('[newPost] >', createdPost);
  return createdPost;
};

module.exports = { createPost };
