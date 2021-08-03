const postsServices = require('../services/postsServices');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  const id = await postsServices.create({ title, content, categoryIds, userId });
  // console.log;
  return res
    .status(201)
    .json({ id, title, content, userId });
};

const getAll = async (_req, res) => {
  const response = await postsServices.getAll();
  return res
    .status(200)
    .json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await postsServices.getById(id);
  return res
    .status(200)
    .json(response);
};

const getBySearch = async (req, res) => {
  const searchTerm = req.query.q;
  const response = await postsServices.getBySearch(searchTerm);
  return res
    .status(200)
    .json(response);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { title, content, categoryIds } = req.body;
  const response = await postsServices.updateById({ id, userId, title, content, categoryIds });
  return res
    .status(200)
    .json(response);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await postsServices.deleteById({ id, userId });
  return res
    .status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  getBySearch,
  updateById,
  deleteById,
};