const response = require('../helpers/response');
const { BlogPost, PostCategory, Category } = require('../models');

const validateCategories = (categoryIds, categories) => {
  if (!categoryIds) return { status: 400, message: '"categoryIds" is required' };
  const found = categoryIds.find(
    (category) => categories.find((cat) => category === cat.dataValues.id),
  );
  if (!found) return response(400, '"categoryIds" not found');
  return { status: 200 };
};

const createAssociation = async (categoryIds, postId) => {
  const promises = categoryIds.map(async (category) => {
    await PostCategory.create({ postId, categoryId: category }); 
  });
  return Promise.all(promises);
};

const create = async (userId, title, categoryIds, content) => {
  if (!title) return response(400, '"title" is required');
  if (!content) return response(400, '"content" is required');

  const categories = await Category.findAll();
  const { status, message } = validateCategories(categoryIds, categories);
  if (status !== 200) return response(status, message);

  try {
    const post = await BlogPost.create(
      { userId, title, content, published: Date.now(), updated: Date.now() },
    );
    await createAssociation(categoryIds, post.dataValues.id);
    return { status: 201, post };
  } catch (error) {
    return response(500, error.message);
  }
};

module.exports = {
  create,
};