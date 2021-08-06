const category = require('../services/categories');

const create = (req, res) => category.create(req.body)
  .then((dataValues) => res.status(201).json(dataValues));

const findAll = (_req, res) => category.findAll()
  .then((dataValues) => res.status(200).json(dataValues));

module.exports = { create, findAll };
