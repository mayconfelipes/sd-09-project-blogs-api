const rescue = require('express-rescue');
const UserService = require('../services/users');

const HTTP_STATUS_OK = 200;

const postLogin = rescue(async (req, res) => {
  const loginPayload = req.body;

  const result = await UserService.login(loginPayload);

  return res.status(HTTP_STATUS_OK).json({ token: result });
});

module.exports = {
  postLogin,
};