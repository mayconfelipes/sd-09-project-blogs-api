const UserService = require('./UserService');
const { Category } = require('../models');

module.exports = {
  setFields: async (token, data) => {
    const user = await UserService.verifyToken(token);
    const post = data;
    post.userId = user[0].id;
    post.published = new Date();
    post.updated = new Date();
    return post;
  },
  validateCategories: async (categoryIds) => {
    const categories = await Category.findAll();
    const catIds = categories.map((category) => category.dataValues.id);
    const invalidCat = categoryIds.every((category) =>
      catIds.includes(category));
    return invalidCat;
  },
};
