const userServices = require('../services/userServices');

const createUser = (req, res) => userServices.create(req.body)
  .then(({ status, user }) => res.status(status).json({ user }));

  const getAllUsers = (_req, res) => userServices.getAllUsers()
  .then(({ status, data }) => res.status(status).json({ users: data }));

  const getUserById = (req, res) => userServices.getUserById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { createUser, getAllUsers, getUserById };