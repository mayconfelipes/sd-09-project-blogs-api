const { Op } = require('sequelize'); // Comparação.
const { BlogPost } = require('../models');
const { User, Category } = require('../models');

const erro = require('../utils/error');

const existCategory = async (categoryIds) => {
  const ctgExists = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });

  if (ctgExists.length === categoryIds.length) {
    return true;
  }

  return false;
};

const createPostService = async (newPost, userId) => {
  const { categoryIds, title, content } = newPost;
  const categoryExists = await existCategory(categoryIds);

  if (!categoryExists) throw erro.CATEGORY_NOT_FOUND;

  const blogPost = await BlogPost.create({ title, content, userId });
  return blogPost;
};

const getAllPostsService = async () => {
  const blogPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories' },
  ] });
  return blogPosts;
};

const getPostByIdService = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories' },
  ] });

  if (!blogPost) throw erro.POST_NOT_FOUND;
  return blogPost;
};

const verifyAuthorPost = async (postId, userId) => {
  const userIdPost = postId;
  let authorized = false;

  if (parseInt(userIdPost, 10) === userId) {
    authorized = true;
  }

  return authorized;
};

const updatePostService = async (id, userId, data) => {
  const { title, content } = data;

  const post = await getPostByIdService(id);
  if (!post) throw erro.POST_NOT_FOUND;

  const authorized = await verifyAuthorPost(id, userId);
  if (!authorized) throw erro.UNAUTHORIZED_USER;
  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await getPostByIdService(id);
  return updatedPost;
};

const deletePostService = async (id, userId) => {
  let postId = await getPostByIdService(id);
  if (!postId) throw erro.POST_NOT_FOUND;

  postId = postId.dataValues.id;

  const authorized = await verifyAuthorPost(postId, userId);
  if (!authorized) throw erro.UNAUTHORIZED_USER;

  await BlogPost.destroy({ where: { id } });

  const deletedPost = await BlogPost.findOne({ where: { id } });
  if (!deletedPost) return true;
};

module.exports = {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
  deletePostService,
};