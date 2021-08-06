const user = require('../services/user');

const create = (req, res) => user.create(req.body)
  .then((dataValues) => res.status(201).json(dataValues));

const login = (req, res) => user.login(req.body)
  .then((token) => res.status(200).json(token));

const findAll = (_req, res) => user.findAll()
  .then((dataValues) => res.status(200).json(dataValues));

const findOne = (req, res) => user.findOne(req.params)
  .then((dataValues) => res.status(200).json(dataValues))
  .catch(({ message }) => res.status(404).json({ message }));

const destroy = (req, res) => user.destroy(req.user).then(() => res.status(204).json());

module.exports = { create, login, findAll, findOne, destroy };
