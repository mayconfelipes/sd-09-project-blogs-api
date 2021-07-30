const { BlogPost, Category, User } = require('../models');

const create = async ({ title, content }, userId) => {
  const newBlogPost = await BlogPost.create({ title, content, userId });

  return newBlogPost.dataValues;
};

const getAll = async () => {
  const getAllBlogPost = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return getAllBlogPost;
};

module.exports = {
  create,
  getAll,
};