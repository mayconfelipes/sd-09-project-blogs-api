const { Category } = require('../models');

const create = (name) => Category.create({ name }).then((category) => category);

const findAll = () => Category.findAll().then((categories) => categories);

module.exports = {
  create,
  findAll,
};