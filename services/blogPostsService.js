const { BlogPost } = require('../models/blogposts');

const createBlogPosts = async ({ title, content, categoryIds }) => {
  const postsCreate = await BlogPost.create({ title, content, categoryIds });

  return postsCreate;
};

module.exports = {
  createBlogPosts,
};