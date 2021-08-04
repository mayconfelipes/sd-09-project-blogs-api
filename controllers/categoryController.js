const rescue = require('express-rescue');
const categoryServices = require('../services/categoryServices');
const authServices = require('../services/auth');

const createCategory = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  const loggedIn = await authServices.validateJWT(authorization);
  if (loggedIn) {
  const result = await categoryServices.createCategory(req.body);
  if (result.status) return next(result);
  return res.status(201).json(result);
}
 });

module.exports = {
  createCategory,
};