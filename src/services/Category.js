const { Category } = require('../models');

const create = (data) => Category.create(data);

const getAll = () => Category.findAll();

module.exports = {
  create,
  getAll,
};
