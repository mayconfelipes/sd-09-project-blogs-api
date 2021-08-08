const users = require('../services/users');

const create = async (req, res) => {
  const { body } = req;
  const { status, ...jsonResponse } = await users.create(body);
  res.status(status).json(jsonResponse);
};

const login = async (req, res) => {
  const { body } = req;
  const { status, ...jsonResponse } = await users.login(body);
  res.status(status).json(jsonResponse);
};

const getAll = async (_req, res) => {
  const { status, usersList } = await users.getAll();
  res.status(status).json(usersList);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, ...jsonResponse } = await users.getById(id);
  res.status(status).json(jsonResponse);
};

module.exports = { create, login, getAll, getById };