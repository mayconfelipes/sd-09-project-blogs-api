const { BlogPosts, Category, User } = require('../models');
const error = require('./error');

const createPostServ = async (blogPostObj, userId) => {
  const { title, categoryIds, content } = blogPostObj;
  if (!title) throw error.requiredTitle;
  if (!categoryIds) throw error.requiredCategoryId;
  if (!content) throw error.requiredContent;
  const existCategoryId = await Category.findOne({ where: { id: categoryIds } });
  if (!existCategoryId) throw error.CategoryIdNotFound;
  const resultPost = await BlogPosts.create({ title, content }); // funcao create precisa receber um objeto, por isso precisa de chaves
  const newResult = {
    id: resultPost.id,
    userId,
    title,
    content,
  };
  return newResult;
};

const getAllPostsServ = async () => {
  const result = await BlogPosts
    .findAll({ include:
      [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] });
  return result;
};

module.exports = {
  createPostServ,
  getAllPostsServ,
};
