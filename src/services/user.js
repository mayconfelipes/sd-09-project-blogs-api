const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const create = (user) => User.create(user);

const login = (user) => generateToken(user);

const findAll = () => User.findAll();

const findOne = ({ id }) => User.findOne({ where: { id } });

const destroy = ({ id }) => User.destroy({ where: { id } });

module.exports = { create, login, findAll, findOne, destroy };
