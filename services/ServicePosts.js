const RepositoryPosts = require('../repository/RepositoryPosts');
const RepositoryCategories = require('../repository/RepositoryCategories');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;

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

module.exports = {
  create,
  getAll,
};