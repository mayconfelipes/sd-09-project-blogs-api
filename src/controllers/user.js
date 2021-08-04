const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const create = (req, res) => User.create(req.body)
  .then(() => res.status(201).json(req.body));

const login = (req, res) => generateToken(req.body)
  .then((token) => res.status(200).json(token));

module.exports = { create, login };
