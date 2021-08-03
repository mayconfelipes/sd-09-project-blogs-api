const { BlogPost } = require('../models');
const { PostsCategory } = require('../models');
const CustomError = require('../utils/CustomError');
const Category = require('./Category');

const associateCategory = (categoryIds, postId) => {
  categoryIds.forEach((categoryId) => {
    PostsCategory.create({ postId, categoryId });
  });
};

const checkCategories = async (categoryIds) => {
  const categories = await Category.getAll();
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

module.exports = {
  create,
};
