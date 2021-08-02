const { BlogPost, Category, User } = require('../models');
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

const findAll = async (authorization) => {
  isValidToken(authorization);
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

module.exports = {
  create,
  findAll,
};
