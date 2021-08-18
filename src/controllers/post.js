const Post = require('../services/post');

const statusHTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
};

// Rotas
const create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const posts = await Post.create(authorization, req.body);

    return res.status(statusHTTP.CREATED).json(posts);
  } catch (error) {
    return next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const posts = await Post.list(authorization);

    return res.status(statusHTTP.OK).json(posts);
  } catch (error) {
    return next(error);
  }
};

const listById = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const posts = await Post.listById(authorization, id);

    return res.status(statusHTTP.OK).json(posts);
  } catch (error) {
    return next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const posts = await Post.edit(authorization, id, req.body);

    return res.status(statusHTTP.OK).json(posts);
  } catch (error) {
    return next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const posts = await Post.exclude(authorization, id);

    return res.status(statusHTTP.NO_CONTENT).json(posts);
  } catch (error) {
    return next(error);
  }
};

const search = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'procurar post por termo' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
  listById,
  edit,
  exclude,
  search,
};
