const { Category } = require('../models');

const create = (category) => Category.create(category)
  .then(({ dataValues }) => dataValues);

const findAll = () => Category.findAll()
  .then((data) => data.map(({ dataValues }) => dataValues));

module.exports = { create, findAll };
