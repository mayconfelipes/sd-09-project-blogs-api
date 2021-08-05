const rescue = require('express');

const createUser = rescue(async (req, res, _next) => {
  const user = req.body;
  res.status(201).json({ user });
});

const getAllUsers = rescue(async (req, res, _next) => {
  const userList = await getUsers();
  return res.status(200).json(userList);
});

const getUserById = rescue(async (req, res, _next) => {
  const user = await getById();
  return res.status(200).json(user);
});

module.exports = { createUser, getAllUsers, getUserById };
