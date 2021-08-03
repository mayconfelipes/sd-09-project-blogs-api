// const { create } = require('frisby');
const rescue = require('express-rescue');
const { createUser, logIn, getAllUsers, getUserById } = require('../services/userService');
const { validateToken } = require('../services/auth');

const generateUser = rescue(async (req, res, next) => {
  const result = await createUser(req.body);
  if (result.status) return next(result);
  return res.status(201).json(result);
});

const generateLogin = rescue(async (req, res, next) => {
  const result = await logIn(req.body);
  if (result.status) return next(result);
  res.status(200).json(result);
});

const getAll = rescue(async (req, res) => {
  const { authorization } = req.headers;
  const isValidToken = await validateToken(authorization);
  if (isValidToken) {
    const result = await getAllUsers();
    res.status(200).json(result);
  }
});

const getById = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  const isValidToken = await validateToken(authorization);
  if (isValidToken) {
    const { id } = req.params;
    const result = await getUserById(id);
    if (result.status) return next(result);
    res.status(200).json(result);
  }
});

module.exports = {
  generateUser,
  generateLogin,
  getAll,
  getById,
};