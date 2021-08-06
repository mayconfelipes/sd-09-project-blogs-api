const categories = require('../services/categories');

const create = async (req, res) => {
  const { body } = req;
  const { status, ...jsonResponse } = await categories.create(body);
  res.status(status).json(jsonResponse);
};

module.exports = { create };