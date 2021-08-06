const { User } = require('../models');

const createUser = (user) => User.create(user);

const getAllUsers = () => User.findAll();

const getUserById = (id) => User.findByPk(id);

module.exports = { createUser, getAllUsers, getUserById };