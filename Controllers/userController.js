const rescue = require('express-rescue');
const UserService = require('../Services/userServices');
const JWT = require('../Auth/createJWT');

const createUser = rescue(async (req, res, _next) => {
  const token = JWT(req.body);
  await UserService.createUser(req.body);
  res.status(201).json({ token });
});

const findAll = rescue(async (req, res, _next) => {
  const listUsers = await UserService.findAll();
  return res.status(200).json(listUsers);
});

const findById = rescue(async (req, res, _next) => {
  const user = await UserService.findById(req.params.id);
  return res.status(200).json(user);
});

module.exports = { createUser, findAll, findById };
