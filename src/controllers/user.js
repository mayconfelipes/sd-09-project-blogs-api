const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const userServices = require('../services/user');
const response = require('../middlewares/responseCodes');
// const { User } = require('../../models');

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
    const users = await userServices.findAll();
    return res.status(response.STATUS_OK).json(users);
})];

const getUserById = [
  validate.authToken,
  validate.userId,
  rescue(async (req, res) => {
    // const user = await User.findByPk(req.params.id);
    const { id } = req.params;
    const user = await userServices.findById(id);
    return res.status(response.STATUS_OK).json(user);
})];

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
};