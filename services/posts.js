const response = require('../helpers/response');
const { BlogPost, PostCategory } = require('../models');

const create = async (userId, title, categoryIds, content) => {
  if (!title) return response(400, '"title" is required');
  if (!content) return response(400, '"content" is required');

  const categories = await PostCategory.findAll();
  const categoriesValidation = validateCategories(categoryIds, categories);
  if (categoriesValidation.status !== 200) {
    return response(categoriesValidation.status, categoriesValidation.message);
  }

  try {
    const post = await BlogPost.create({ userId, title, content });
    categoryIds.forEach(async (category) => {
      await PostCategory.create({ postId: post.id, categoryId: category });
    });
    return { status: 201, post };
  } catch (error) {
    return response(500, error.message);
  }
};

module.exports = {
  create,
};