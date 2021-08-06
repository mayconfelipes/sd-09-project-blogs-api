const category = require('../services/categories');

const create = (req, res) => category.create(req.body)
  .then((data) => res.status(201).json(data));

const findAll = (_req, res) => category.findAll()
  .then((data) => res.status(200).json(data));

module.exports = { create, findAll };
