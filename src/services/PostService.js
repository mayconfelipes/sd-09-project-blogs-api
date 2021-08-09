const { BlogPost } = require('../models');

const createPost = async (userId, title, content) => {
  const post = await BlogPost.create({ userId, title, content })
    .then((newPost) => newPost.dataValues)
    .catch((error) => error);

  return post;
};

  module.exports = { 
  createPost,
};