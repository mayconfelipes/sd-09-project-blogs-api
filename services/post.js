const { Category } = require('../models');
const { BlogPost } = require('../models');
const { PostsCategory } = require('../models');
const { User } = require('../models');

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

const listPosts = async () => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});
return posts;
};

const postById = async (id) => {
  const postId = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });
  return postId;
};

const editCategories = (request, response, next) => {
  const { categoryIds } = request.body;
  if (categoryIds) {
    return response.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
};

const validUser = async (request, response, next) => {
  const { id } = request.params;
  // console.log(request.user);
  const { id: userId } = request.user;
  const post = await BlogPost.findOne({ where: { id } });
  if (post.userId !== userId) return response.status(401).json({ message: 'Unauthorized user' });
  next();
};

const updatePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const post = await BlogPost.findOne({ where: { id },
  include: [{ model: Category, as: 'categories', through: { attributes: [] } }] });
  // console.log(post);
  return post;
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryId,
  validateCategories,
  insertPost,
  listPosts,
  postById,
  updatePost,
  editCategories,
  validUser,
};