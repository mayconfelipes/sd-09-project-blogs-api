const {
  registerPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostByIdService,
  deletePostByIdService,
  getPostBySearchTermService,
} = require('../services/postService');

const registerPostController = async (req, res, next) => {
  const { body, payload } = req;
  console.log(payload);
  const result = await registerPostService(body, payload);
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(201).json(response);
};

const getAllPostsController = async (_req, res, next) => {
  const result = await getAllPostsService();
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(200).json(response);
};

const getPostByIdController = async (req, res, next) => {
  const { params: { id } } = req;
  const result = await getPostByIdService(id);
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(200).json(response);
};

const updatePostByIdController = async (req, res, next) => {
  const { params: { id }, body, payload } = req;
  const result = await updatePostByIdService(id, body, payload.id);
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(200).json(response);
};

const deletePostByIdController = async (req, res, next) => {
  const { params: { id }, payload } = req;
  const result = await deletePostByIdService(id, payload.id);
  if (result) {
    return next(result.error);
  }
  return res.status(204).end();
};

const getPostBySearchTermController = async (req, res, _next) => {
  const { query: { q } } = req;
  if (q === '') {
    const result = await getAllPostsService();
    const { response } = result;
    return res.status(200).json(response);
  }
  const result = await getPostBySearchTermService(q);
  const { response } = result;
  return res.status(200).json(response);
};

module.exports = {
  registerPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostByIdController,
  deletePostByIdController,
  getPostBySearchTermController,
};
