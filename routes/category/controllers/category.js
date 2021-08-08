const routes = require('express').Router();
const Services = require('../services/index');
const { STATUS_CREATED, STATUS_OK } = require('../../../utils/RestCodes');

routes.post('/', async (req, res, next) => {
  const { name } = req.body;

  const category = await Services.save({ name });

  if (category.error) return next(category);

  res.status(STATUS_CREATED).json(category);
});

routes.get('/', async (_req, res, next) => {
  const categories = await Services.all();

  if (categories.error) return next(categories);

  res.status(STATUS_OK).json(categories);
});

module.exports = routes;