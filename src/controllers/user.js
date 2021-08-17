const User = require('../services/user');

const statusHTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
};

// Rotas
const create = async (req, res, next) => {
  try {
    const users = await User.create(req.body);

    return res.status(statusHTTP.CREATED).json(users);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const users = await User.login(req.body);

    return res.status(statusHTTP.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const users = await User.list(authorization);

    return res.status(statusHTTP.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

const listById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;

    const users = await User.listById(id, authorization);

    return res.status(statusHTTP.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const users = await User.exclude(authorization);

    return res.status(statusHTTP.NO_CONTENT).json(users);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  login,
  list,
  listById,
  exclude,
};
