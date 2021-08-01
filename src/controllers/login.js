const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const loginServices = require('../services/user');
const response = require('../middlewares/responseCodes');

const logUser = [
  validate.loginInfo,
  validate.userExists,
  validate.authUser,
  rescue(async (req, res) => {
    const loggedUser = await loginServices.logUser(req.body);
    return res.status(response.STATUS_OK).json({ token: loggedUser });
  }),
];

module.exports = {
  logUser,
};