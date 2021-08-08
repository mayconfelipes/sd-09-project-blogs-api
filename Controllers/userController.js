const rescue = require('express-rescue');
const UserService = require('../Services/userServices');
const JWT = require('../Auth/createJWT');

const createUser = rescue(async (req, res, _next) => {
  const token = JWT(req.body);
  await UserService.createUser(req.body);
  res.status(201).json({ token });
});

const getAllUsers = rescue(async (req, res, _next) => {
  const listUsers = await UserService.findAll();
  return res.status(200).json(listUsers);
});

const getUserById = rescue(async (req, res, _next) => {
  const user = 'deu bom';
  return res.status(200).json(user);
});

module.exports = { createUser, getAllUsers, getUserById };
