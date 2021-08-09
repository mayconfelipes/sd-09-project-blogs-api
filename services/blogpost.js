const { BlogPost } = require('../models');

const createPost = async (postData) => {
  const newPost = await BlogPost.create(postData);
  const { id, title, content, userId } = newPost.dataValues;
  return { id, title, content, userId };
};

const findAllBlogPosts = async () => BlogPost.findAll();

module.exports = { createPost, findAllBlogPosts };
