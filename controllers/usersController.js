const users = require('../services/usersService');
const { BAD_REQUEST, CONFLICT, UNAUTHORIZED, NOT_FOUND } = require('../utils/httpStatus');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await users.create({ displayName, email, password, image });
    return res.status(201).json(result);
  } catch (error) {
      if (error.type === CONFLICT) error.status = 409;
      if (error.type === BAD_REQUEST) error.status = 400;
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const result = await users.findAll(authorization);
    return res.status(200).json(result);
  } catch (error) {
      if (error.type === UNAUTHORIZED) error.status = 401;
    next(error);
  }
};

const findById = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    const result = await users.findById(authorization, id);
    return res.status(200).json(result);
  } catch (error) {
      if (error.type === NOT_FOUND) error.status = 404;
      if (error.type === UNAUTHORIZED) error.status = 401;
    next(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
};
