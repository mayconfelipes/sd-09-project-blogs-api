const rescue = require('express-rescue');
const { validateLogin, userIsRegistered } = require('../middlewares/validations');
const loginServices = require('../services/login');

const login = [
  validateLogin,
  userIsRegistered,
  rescue(async (req, res) => {
    const token = await loginServices.login(req.body);
    return res.status(200).json({ token });
  }),
];

module.exports = { login };
