const services = require('../services');

const create = async (req, res) => {
  const { name } = req.body;
  const { status, category, message } = await services.categories.create(name);

  if (status !== 201) res.status(status).json({ message });
  res.status(status).json(category);
};

const getAll = async (req, res) => {
  const { status, categories, message } = await services.categories.getAll();

  if (status !== 200) res.status(status).json({ message });
  res.status(status).json(categories);
};

module.exports = {
  create,
  getAll,
};