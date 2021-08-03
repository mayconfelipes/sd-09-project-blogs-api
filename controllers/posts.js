const postServices = require('../services/posts');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const post = req.body;
    const { id } = req.user;
    const newPost = await postServices.create(post, id);

    return res.status(CREATED_STATUS).json(newPost);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allPosts = await postServices.getAll();

    return res.status(OK_STATUS).json(allPosts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allPosts = await postServices.getById(id);

    return res.status(OK_STATUS).json(allPosts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};