const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const userServices = require('../services/user');
const response = require('../middlewares/responseCodes');

const createNewUser = [
  validate.userDetails,
  validate.userIsNew,
  rescue(async (req, res) => {
  const newUser = await userServices.createNewUser(req.body);
  return res.status(response.STATUS_CREATED).json(newUser);
})];

module.exports = {
  createNewUser,
};