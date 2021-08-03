const { Category } = require('../models');

const create = (data) => Category.create(data);

module.exports = {
  create,
};
