const postServices = require('../services/postServices');
const { created, ok } = require('../helpers/getHttpStatusCode');

const createPost = async (req, res, next) => {
  const { id } = req.user;

  try {
    const post = await postServices.createPost({ userId: id, ...req.body });
    return res.status(created).json(post);
  } catch (err) {
    return next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const posts = await postServices.findAll();
    return res.status(ok).json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createPost, getAll };
