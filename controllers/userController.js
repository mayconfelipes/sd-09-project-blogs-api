// const { create } = require('frisby');
const rescue = require('express-rescue');
const { createUser } = require('../services/userService');

const generateUser = rescue(async (req, res, next) => {
  const result = await createUser(req.body);
  console.log(result);
  if (result.status) return next(result);
  return res.status(201).json(result);
});

module.exports = {
  generateUser,
};