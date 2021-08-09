const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');

const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const getAllBloPosts = () => (BlogPost.findAll());
const getBlogPostById = (id) => (BlogPost.findOne({ where: { id } }));
const addBlogPost = async (post, categoryIds) => {
  const ts = await sequelize.transaction();
  try {
    const blogPost = await BlogPost.create(post, { transaction: ts });
    await PostCategory.create({ PostId: blogPost.id, categoryIds }, { transaction: ts });
  } catch (error) {
    console.log(error);
  }
};

module.expect = {
  getAllBloPosts,
  getBlogPostById,
  addBlogPost,
};