const postModels = require('../models/postModels');
const categoryModels = require('../models/categoryModels');
const postsCategoryModels = require('../models/postsCategoryModels');

const generateError = require('../auxiliarFunctions/generateError');
const checkOwner = require('../auxiliarFunctions/checkOwner');

const checkPostCategories = async (categoryArray) => Promise
  .all(categoryArray.map((id) => categoryModels.getCategoryById(id)));

  const createPostsCategory = async (postId, categoryIds) => {
    await Promise.all(categoryIds.map((category) => postsCategoryModels
      .createPostsCategory({ postId, categoryId: category })));
  };

const postNewPost = async ({ userId, title, content, categoryIds }) => {
  const categoryCheck = await checkPostCategories(categoryIds);

  if (categoryCheck.includes(null)) throw generateError('badRequest', '"categoryIds" not found');

  const result = await postModels.postNewPost({ userId, title, content, categoryIds });

  await createPostsCategory(result.dataValues.id, categoryIds);

  return result;
};

const getAllPosts = async () => {
  const result = await postModels.getAllPosts();

  return result;
};

const getPostByPostId = async (id) => {
  const result = await postModels.getPostByPostId(id);

  if (!result) throw generateError('notFound', 'Post does not exist');

  return result;
};

const updatePost = async ({ userId, id, title, content }) => {
  const myPost = await postModels.getPostByPostId(id);

  if (!myPost) throw generateError('notFound', 'Post does not exist');

  if (!checkOwner({ userId, postUserId: myPost.dataValues.userId })) {
    throw generateError('unauthorized', 'Unauthorized user');
  }

  const result = await postModels.updatePost({ id, title, content });

  if (result[0] === 1) return postModels.getPostByPostId(id);

  return generateError('noContent', 'No update needed');
};

const deletePost = async ({ userId, id }) => {
  const myPost = await postModels.getPostByPostId(id);

  if (!myPost) throw generateError('notFound', 'Post does not exist');

  if (!checkOwner({ userId, postUserId: myPost.dataValues.userId })) {
    throw generateError('unauthorized', 'Unauthorized user');
  }

  const result = await postModels.deletePost(id);

  return result;
};

const searchPost = async (term) => {
  const result = postModels.searchPost(term);

  return result;
};

module.exports = {
  postNewPost,
  getAllPosts,
  getPostByPostId,
  updatePost,
  deletePost,
  searchPost,
};
