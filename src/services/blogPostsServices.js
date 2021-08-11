const Sequelize = require('sequelize');
const Joi = require('joi');
const { BlogPost, PostsCategories } = require('../models');

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
  userId: Joi.number().required(),
});

const config = require('../config/config');
const { getAllCategories } = require('./categoriesServices');
const { getAllUsers } = require('./usersServices');

const sequelize = new Sequelize(config.development);
let promises = [];
const formatBlogPostObject = (user, blogPost) => {
  const newBlogPost = { ...blogPost, user };
  delete newBlogPost.UserId;
  return newBlogPost;
};
const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll();
  const users = await getAllUsers();
  const allCategories = await getAllCategories();
  const allPostsCategories = await PostsCategories.findAll();
  const blogPostsReport = blogPosts.map((blogpost) => {
    const user = users.find((us) => us.id === blogpost.userId);
    const newBlogPost = formatBlogPostObject(user, blogpost.dataValues);
    const postsCategories = allPostsCategories.filter(
      (postCategory) => postCategory.postId === blogpost.id,
    );
    const categories = postsCategories.map((postsCategory) => {
        const category = allCategories.find((cat) => cat.id === postsCategory.categoryId);
        return category;
    });
    newBlogPost.categories = categories;
    return newBlogPost;
  });
  return blogPostsReport;
};
const getBlogPostById = (id) => (BlogPost.findOne({ where: { id } }));
const validateCategories = async (categoryIds) => {
  const allCategories = await getAllCategories();
  let isValid = true;
  isValid = await categoryIds.every((categoryId) => (
    allCategories.find((category) => categoryId === category.id)));
  return isValid;
};
const addBlogPost = async (blogPostData) => {
  const { error } = blogPostSchema.validate(blogPostData);
  if (error) throw new Error(error.details[0].message);
  const ts = await sequelize.transaction();
  const { categoryIds, title, content, userId } = blogPostData;
  const validCategory = await validateCategories(categoryIds);
  if (!validCategory) throw new Error('"categoryIds" not found');
  try {
    const blogPost = await BlogPost.create({ title, content, userId }, { transaction: ts });
    const postId = blogPost.id;
    promises = categoryIds.map(async (categoryId) => (
      PostsCategories.create({ postId, categoryId }, { transaction: ts })));
    Promise.all(promises).then(() => ts.commit());
    return blogPost;
  } catch (err) {
    await ts.rollback();
    throw new Error(err.message);
  }
};

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  addBlogPost,
};