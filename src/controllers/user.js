const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const create = (req, res) => User.create(req.body)
  .then(() => res.status(201).json(req.body));

const login = (req, res) => generateToken(req.body)
  .then((token) => res.status(200).json(token));

const getAll = (_req, res) => User.findAll()
  .then((data) => res.status(200).json(data.map(({ dataValues }) => dataValues)));

const getById = (req, res) => User.findByPk(req.params.id)
  .then(({ dataValues }) => res.status(200).json(dataValues))
  .catch(() => res.status(404).json({ message: 'User does not exist' }));

module.exports = { create, login, getAll, getById };
