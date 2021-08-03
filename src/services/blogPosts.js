const { BlogPosts, Categories } = require('../models');

const create = async (title, content, userId, categoryIds) => {
  const categories = await Promise.all(categoryIds.map(async (categoryId) => 
    Categories.findByPk(categoryId)));

  if (categories.some((cat) => cat === null)) {
    return { error: { message: '"categoryIds" not found' } };
  }

  const { dataValues } = await BlogPosts.create({ title, content, userId });
  
  return {
    id: dataValues.id,
    userId: dataValues.userId,
    title: dataValues.title,
    content: dataValues.content,
  };
};

module.exports = {
  create,
};