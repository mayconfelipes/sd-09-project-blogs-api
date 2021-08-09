const rescue = require('express-rescue');
const userService = require('../services/users');

const HTTP_STATUS_CREATED = 201;

const postUsers = rescue(async (req, res) => {
  const payload = req.body;

  const result = await userService.createUser(payload);

  return res.status(HTTP_STATUS_CREATED).json({ token: result });
});

module.exports = {
  postUsers,  
};
