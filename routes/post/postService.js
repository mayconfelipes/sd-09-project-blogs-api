const postModel = require('./postModel');
const validations = require('../../util/validations');
const { postNotExist, unauthorizedUser } = require('../../util/errorsMessages');

const createPost = async (blogPost, userId) => {
  validations.validateNewBlogPost(blogPost);
  await validations.validateCategoryIds(blogPost.categoryIds);
  const result = await postModel.createPost(blogPost, userId);
  return result;
};

const allPosts = async () => {
  const result = await postModel.allPosts();
  return result;
};

const findPostById = async (id) => {
  const result = await postModel.findPostById(id);
  if (!result) throw postNotExist;
  return result;
};

const updatePost = async (id, postToUpdate, userId) => {
  validations.validatePostUpdate(postToUpdate);
  const findPost = await findPostById(id);
  if (findPost.user.id !== userId) throw unauthorizedUser;
  await postModel.updatePost(id, postToUpdate);
  return {
    title: postToUpdate.title,
    content: postToUpdate.content,
    userId,
    categories: findPost.categories,
  };
};

const deletePost = async (id, userId) => {
  const findPost = await findPostById(id);
  if (findPost.user.id !== userId) throw unauthorizedUser;
  await postModel.deletePost(id);
};

module.exports = {
  createPost,
  allPosts,
  findPostById,
  updatePost,
  deletePost,
};
