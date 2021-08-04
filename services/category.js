const { Category } = require('../models');

const create = (name) => Category.create({ name }).then((category) => category);

module.exports = {
  create,
};