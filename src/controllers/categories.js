const categories = require('../services/categories');

const create = async (req, res) => {
  const { body } = req;
  const { status, ...jsonResponse } = await categories.create(body);
  res.status(status).json(jsonResponse);
};

const getAll = async (_req, res) => {
    const { status, categoryList } = await categories.getAll();
    res.status(status).json(categoryList);
};

module.exports = { create, getAll };