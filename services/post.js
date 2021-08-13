const { Category } = require('../models');
const { BlogPost } = require('../models');
const { PostsCategory } = require('../models');

const validateTitle = async (request, response, next) => {
  const { title } = request.body;
  // console.log(`Imprimindo valor de name em category/services ${name}`);

  if (title === '' || !title) {
    return response.status(400).json({ message: '"title" is required' });
  }
  next();
};

const validateContent = async (request, response, next) => {
  const { content } = request.body;
  // console.log(`Imprimindo valor de name em category/services ${name}`);

  if (content === '' || !content) {
    return response.status(400).json({ message: '"content" is required' });
  }
  next();
};

const validateCategoryId = async (request, response, next) => {
  const { categoryIds } = request.body;
  // console.log(`Imprimindo valor de name em category/services ${name}`);

  if (!categoryIds || !categoryIds.length) {
    return response.status(400).json({ message: '"categoryIds" is required' });
  }
  next();
};

const validateCategories = async (request, response, next) => {
  const { categoryIds } = request.body;
  const categories = await Category.findAll({ where: { id: categoryIds } });
  // console.log(`Imprimindo valor de name em category/services ${name}`);

  if (categoryIds.length !== categories.length) {
    return response.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const insertPost = async (post, userId) => {
  const { title, content, categoryIds } = post;
  const newPost = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (id) => { 
    await PostsCategory.create({ postId: newPost.id, categoryId: id }); 
  });
  return newPost;
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryId,
  validateCategories,
  insertPost,
};