const rescue = require('express-rescue');
const userServices = require('../services/userServices');

const createUser = rescue(async (req, res, next) => {
  const result = await userServices.createUser(req.body);
  if (result.status) return next(result);
  return res.status(201).json(result);
});

const login = rescue(async (req, res, next) => {
  const result = await userServices.login(req.body);
  if (result.status) return next(result);
  res.status(200).json(result);
});

module.exports = {
  createUser,
  login,
}; 