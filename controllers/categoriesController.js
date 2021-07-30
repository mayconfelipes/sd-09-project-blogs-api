const categories = require('../services/categoriesService');
const { BAD_REQUEST, UNAUTHORIZED } = require('../utils/httpStatus');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { authorization } = req.headers;
    const result = await categories.create(name, authorization);
    return res.status(201).json(result);
  } catch (error) {
      if (error.type === BAD_REQUEST) error.status = 400;
      if (error.type === UNAUTHORIZED) error.status = 401;
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const result = await categories.findAll(authorization);
    return res.status(200).json(result);
  } catch (error) {
      if (error.type === UNAUTHORIZED) error.status = 401;
    next(error);
  }
};

module.exports = {
  create,
  findAll,
};
