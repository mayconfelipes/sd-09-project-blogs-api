const { BlogPost } = require('../models');
const { PostsCategory, User, Category } = require('../models');
const CustomError = require('../utils/CustomError');
const CategoryService = require('./Category');

const associateCategory = (categoryIds, postId) => {
  categoryIds.forEach((categoryId) => {
    PostsCategory.create({ postId, categoryId });
  });
};

const checkCategories = async (categoryIds) => {
  const categories = await CategoryService.getAll();
  categoryIds.forEach((id) => {
    if (!(categories.some(({ dataValues }) => dataValues.id === id))) {
      throw new CustomError('invalidData', '"categoryIds" not found');
    }
  });
};

const create = async ({ title, content, categoryIds }, userId) => {
  await checkCategories(categoryIds);
  const post = await BlogPost.create({ title, content, userId });
  associateCategory(categoryIds, post.id);
  return {
    id: post.id,
    userId: post.userId,
    title: post.title,
    content: post.content,
  };
};

const getAll = () => BlogPost.findAll({ 
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

module.exports = {
  create,
  getAll,
};
