const { Category } = require('../models');

const create = (category) => Category.create(category);

const findAll = () => Category.findAll();

module.exports = { create, findAll };
