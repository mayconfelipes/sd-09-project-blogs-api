const { Category } = require('../models');

const create = (req, res) => Category.create(req.body)
  .then(({ dataValues }) => res.status(201).json(dataValues));

const getAll = (req, res) => Category.findAll()
  .then((data) => res.status(200).json(data.map(({ dataValues }) => dataValues)));

module.exports = { create, getAll };
