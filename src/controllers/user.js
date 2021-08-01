const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const userServices = require('../services/user');
const response = require('../middlewares/responseCodes');
const { Users } = require('../../models');

const createNewUser = [
  validate.userDetails,
  validate.userIsNew,
  rescue(async (req, res) => {
  const newUser = await userServices.createNewUser(req.body);
  return res.status(response.STATUS_CREATED).json(newUser);
})];

const getUsers = [
  validate.authToken,
  rescue(async (req, res) => {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(response.STATUS_OK).json(users);
})];

module.exports = {
  createNewUser,
  getUsers,
};