const RepositoryPosts = require('../repository/RepositoryPosts');
const RepositoryCategories = require('../repository/RepositoryCategories');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const create = async ({ title, content, categoryIds }, userId) => {
  const getCategories = await RepositoryCategories.findCategories(categoryIds);

  if (getCategories.length !== categoryIds.length) {
    throw invalidData('"categoryIds" not found', BAD_REQUEST);
  }

  const newBlogPost = await RepositoryPosts.create({ title, content }, userId);

  return newBlogPost;
};

const getAll = async () => {
  const getAllBlogPost = await RepositoryPosts.getAll();

  return getAllBlogPost;
};

const getPostById = async (id) => {
  const post = await RepositoryPosts.getPostById(id);

  if (!post) throw invalidData('Post does not exist', NOT_FOUND);

  return post;
};

const updatePost = async ({ title, content }, id, userId) => {
  const verifyUserId = await RepositoryPosts.getPostById(id);

  if (verifyUserId.userId !== userId) {
    throw invalidData('Unauthorized user', UNAUTHORIZED);
  }

  const upatedPost = await RepositoryPosts.updatePost({ title, content }, id);

  return upatedPost;
};

const deletePost = async (id, userId) => {
  const post = await RepositoryPosts.getPostById(id);

  if (!post) throw invalidData('Post does not exist', NOT_FOUND);

  const verifyUserId = await RepositoryPosts.getPostById(id);

  if (verifyUserId.userId !== userId) {
    throw invalidData('Unauthorized user', UNAUTHORIZED);
  }

  await RepositoryPosts.deletePost(id);
};

module.exports = {
  create,
  getAll,
  getPostById,
  updatePost,
  deletePost,
};