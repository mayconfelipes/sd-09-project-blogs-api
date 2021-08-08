const routes = require('express').Router();
const Services = require('../services/index');

routes.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  const token = await Services.login({ email, password });

  if (token.error) return next(token);

  res.status(200).json(token);
});

module.exports = routes;