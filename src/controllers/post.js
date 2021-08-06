const post = require('../services/post');

const create = (req, res) => post.create(req.body, req.user.id)
  .then((dataValues) => res.status(201).json(dataValues));

const findAll = (_req, res) => post.findAll().then((data) => res.status(200).json(data));

const findOne = (req, res) => post.findOne(req.params)
  .then((data) => res.status(200).json(data));

const update = (req, res) => post.update(req.body, req.params)
  .then((dataValues) => res.status(200).json(dataValues));

const destroy = (req, res) => post.destroy(req.params)
  .then(() => res.status(204).json());

module.exports = { create, findAll, findOne, update, destroy };
