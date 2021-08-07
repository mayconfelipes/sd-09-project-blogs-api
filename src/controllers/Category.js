const rescue = require('express-rescue');
const Category = require('../services/Category');

const create = rescue(async (req, res, next) => {
  const { name } = req.body;

  const response = await Category.create(name);

  if (response.err) {
    return next({
      error: {
        statusCode: 409,
        message: response.err.message,
      },
    });
  }

  return res.status(201).json(response);
});

const findAll = rescue(async (_req, res) => {
  const categories = await Category.findAll();

  return res.status(200).json(categories);
});

module.exports = {
  create,
  findAll,
};