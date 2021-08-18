const rescue = require('express-rescue');

const postServices = require('../services/posts');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NO_CONTENT = 204;

const createPost = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const userId = req.user.id;

  const result = await postServices.createPost({ title, content, categoryIds, userId });

  return res.status(HTTP_STATUS_CREATED).json(result);
});

const getAllPosts = rescue(async (_req, res) => {
  const result = await postServices.getAll();

  return res.status(HTTP_STATUS_OK).json(result);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await postServices.getById(id);

  return res.status(HTTP_STATUS_OK).json(result);
});

const updatePost = rescue(async (req, res) => {
  const postId = req.params.id;
  const postPayload = req.body;
  const userId = req.user.id;

  const result = await postServices.updatePost(postPayload, postId, userId);

  return res.status(HTTP_STATUS_OK).json(result);
});

const deletePost = rescue(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  await postServices.deletePost(postId, userId);

  return res.status(HTTP_STATUS_NO_CONTENT).end();
});

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getAllPosts,
};
