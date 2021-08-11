const { BlogPosts, Category, User } = require('../models');
const error = require('./error');

const createPostServ = async (blogPostObj, userData) => {
  const { title, categoryIds, content } = blogPostObj;
  if (!title) throw error.requiredTitle;
  if (!categoryIds) throw error.requiredCategoryId;
  if (!content) throw error.requiredContent;
  const existCategoryId = await Category.findOne({ where: { id: categoryIds } });
  if (!existCategoryId) throw error.CategoryIdNotFound;
  const resultPost = await BlogPosts.create({ title, categoryIds, content, userId: userData }); // funcao create precisa receber um objeto, por isso precisa de chaves
  return resultPost;
};

const getAllPostsServ = async () => {
  const result = await BlogPosts
    .findAll({ include:
      [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, // este as é o mesmo nome renomeado no model de BlogPost
       { model: Category, as: 'categories', through: { attributes: [] } }] });
  return result;
};

module.exports = {
  createPostServ,
  getAllPostsServ,
};
