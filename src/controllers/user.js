const user = require('../services/user');

const create = (req, res) => user.create(req.body)
  .then((data) => res.status(201).json(data));

const login = (req, res) => user.login(req.body)
  .then((token) => res.status(200).json(token));

const findAll = (_req, res) => user.findAll()
  .then((data) => res.status(200).json(data));

const findOne = (req, res) => user.findOne(req.params)
  .then((data) => res.status(200).json(data));

const destroy = (req, res) => user.destroy(req.user)
  .then(() => res.status(204).json());

module.exports = { create, login, findAll, findOne, destroy };
