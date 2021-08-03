// const Sequelize = require('sequelize');
// const config = require('../config/config');

// const sequelize = new Sequelize(config.development);

const { BlogPosts } = require('../models');

const create = async (title, content, categoryIds, id) => {
  console.log(id);
  // const t = await sequelize.transaction();
  const newPost = await BlogPosts.create({ userId: id, title, content });
  // await PostCategory.create((categoryIds), { transaction: t });
  // await t.commit();

  return newPost;
};

// const getAll = async () => {
//     const categories = await BlogPosts.findAll({});
//     return categories;
//   };

module.exports = {
  create,
  // getAll,
};