const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const err = (message) => ({ message });

const create = (user) => User.create(user).then(({ dataValues }) => dataValues);

const login = (user) => generateToken(user).then((token) => token);

const findAll = () => User.findAll()
  .then((data) => data.map(({ dataValues }) => dataValues));

const findOne = ({ id }) => User.findOne({ where: { id } })
  .then(({ dataValues }) => dataValues)
  .catch(() => { throw err('User does not exist'); });

const destroy = ({ id }) => User.destroy({ where: { id } });

module.exports = { create, login, findAll, findOne, destroy };
