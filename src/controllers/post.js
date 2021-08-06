const post = require('../services/post');

const create = (req, res) => post.create(req.body, req.user.id)
  .then((data) => res.status(201).json(data));

const findAll = (_req, res) => post.findAll()
  .then((data) => res.status(200).json(data));

const findOne = (req, res) => post.findOne(req.params)
  .then((data) => res.status(200).json(data));

const update = (req, res) => post.update(req.body, req.params)
  .then((data) => res.status(200).json(data));

const destroy = (req, res) => post.destroy(req.params)
  .then(() => res.status(204).json());

const search = (req, res) => post.search(req.query)
  .then((data) => res.status(200).json(data));

module.exports = { create, findAll, findOne, update, destroy, search };
