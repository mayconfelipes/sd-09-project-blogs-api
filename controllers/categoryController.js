const rescue = require('express-rescue');
const services = require('../services');

const createCategory = rescue(async (req, res, _next) => {
  const newCategory = await services.createCategory(req.body);

  return res.status(201).json(newCategory);
});

module.exports = {
  createCategory,
};
