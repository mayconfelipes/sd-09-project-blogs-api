const postServices = require('../services/postServices');
const { created, ok, noContent } = require('../helpers/getHttpStatusCode');

const createPost = async (req, res, next) => {
  const { id } = req.user;

  try {
    const post = await postServices.createPost({ userId: id, ...req.body });
    return res.status(created).json(post);
  } catch (err) {
    return next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const posts = await postServices.getAll();
    return res.status(ok).json(posts);
  } catch (err) {
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await postServices.getById(id);
    return res.status(ok).json(post);
  } catch (err) {
    return next(err);
  }
};

const deletePost = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id } = req.user;
  try {
    const result = await postServices.deletePost(postId, id);
    return res.status(noContent).json(result);
  } catch (err) {
    return next(err);
  }
};

const searchKeyword = async (req, res, next) => {
  const { q: keyword } = req.query;

  try {
    const posts = await postServices.searchKeyword(keyword);
    return res.status(ok).json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  deletePost,
  searchKeyword,
};
