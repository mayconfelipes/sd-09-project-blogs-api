const userService = require('../services/Users');

const CREATED_STATUS = 201;

const registerUser = (req, res) => userService.register(req.body)
  .then((data) => res.status(CREATED_STATUS).json(data));

module.exports = {
  registerUser,
};
