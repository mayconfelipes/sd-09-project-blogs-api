const rescue = require('express-rescue');
const { categoriesService } = require('../services');

const { code: { CREATED } } = require('../utils');

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await categoriesService.createCategory(name);
  return res.status(CREATED).json(category);
});

module.exports = {
  create,
};
