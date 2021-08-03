// const { create } = require('frisby');
const rescue = require('express-rescue');
const { createUser, logIn } = require('../services/userService');

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

module.exports = {
  generateUser,
  generateLogin,
};