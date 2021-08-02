const { BlogPost, Category, User } = require('../models');
const { isValidToken } = require('./utils/tokenValidate');
const { isValidfields, isExistPost,
  isvalidfieldsForUpdate, isValidUser } = require('./utils/blogPostValidate');

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
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const findById = async (id, authorization) => {
  isValidToken(authorization);
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  isExistPost(result);
  return result;
};

const update = async (id, postData, authorization) => {
  isvalidfieldsForUpdate(postData);
  const userIdLogged = isValidToken(authorization);

  const blogPost = await BlogPost.findByPk(id);
  isValidUser(userIdLogged, blogPost);

  await BlogPost.update(postData, { where: { id } });

  const res = await BlogPost.findByPk(id, { attributes: { exclude: ['id', 'published', 'updated'] },
    include: { model: Category, as: 'categories', through: { attributes: [] } } });
  
  return res;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};
