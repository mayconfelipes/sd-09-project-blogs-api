const rescue = require('express-rescue');
const UserService = require('../Services/userServices');
const JWT = require('../Auth/createJWT');

const createUser = rescue(async (req, res, _next) => {
  const user = req.body;
  const token = JWT(user);
  await UserService.registerUser({ ...user });
  res.status(201).json({ token });
});

const getAllUsers = rescue(async (req, res, _next) => res.status(200).json(req.body));

const getUserById = rescue(async (req, res, _next) => {
  const user = 'deu bom';
  return res.status(200).json(user);
});

module.exports = { createUser, getAllUsers, getUserById };
