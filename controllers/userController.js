const rescue = require('express-rescue');
const userServices = require('../services/userServices');

const createUser = rescue(async (req, res, next) => {
  const result = await userServices.createUser(req.body);
  if (result.status) return next(result);
  return res.status(201).json(result);
});

module.exports = {
  createUser,
}; 