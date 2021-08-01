const { BlogPost } = require('../models');
const { isValidfields } = require('./utils/blogPostValidate');
const { isValidToken } = require('./utils/tokenValidate');

const create = async (blogPost, authorization) => {
  await isValidfields(blogPost);
  const userId = isValidToken(authorization);
  const { categoryIds, ...blogPostWithoutCategories } = blogPost;
  const newBlogPost = { userId, ...blogPostWithoutCategories };
  
  const post = await BlogPost.create(newBlogPost);
  const { published, updated, ...result } = post.dataValues;
  return result;
};

module.exports = {
  create,
};
