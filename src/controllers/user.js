const User = require('../services/user');

const statusHTTP = {
  OK: 200,
  CREATED: 201,
};

// Rotas
const create = async (req, res, next) => {
  try {
    const users = await User.create(req.body);

    res.status(statusHTTP.CREATED).json(users);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const users = await User.login(req.body);

    res.status(statusHTTP.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const users = await User.list(authorization);

    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const listById = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'listar usuario por id' });
  } catch (error) {
    next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'excluir usuario' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  login,
  list,
  listById,
  exclude,
};
