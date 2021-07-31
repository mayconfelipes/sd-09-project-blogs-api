const postService = require('./postService');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NOT_CONTENT = 204;

const createPost = async (req, res, _next) => {
  const blogPost = req.body;
  const { id } = req.user;
  const result = await postService.createPost(blogPost, id);
  res.status(HTTP_STATUS_CREATED).json(result);
};

const allPosts = async (_req, res, _next) => {
  const result = await postService.allPosts();
  res.status(HTTP_STATUS_OK).json(result);
};

const findPostById = async (req, res, _next) => {
  const { id } = req.params;
  const result = await postService.findPostById(id);
  res.status(HTTP_STATUS_OK).json(result);
};

const updatePost = async (req, res, _next) => {
  const { id } = req.params;
  const postToUpdate = req.body;
  const { id: userId } = req.user;
  const result = await postService.updatePost(id, postToUpdate, userId);
  res.status(HTTP_STATUS_OK).json(result);
};

const deletePost = async (req, res, _next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  await postService.deletePost(id, userId);
  res.status(HTTP_STATUS_NOT_CONTENT).json();
};

module.exports = {
  createPost,
  allPosts,
  findPostById,
  updatePost,
  deletePost,
};
