const rescue = require('express-rescue');
const { validateLogin, userIsRegistered } = require('../middlewares/validations');
const loginServices = require('../services/login');

const login = [
  validateLogin,
  userIsRegistered,
  rescue(async (req, res) => {
    const { email } = req.body;
    const token = await loginServices.login({ email });
    return res.status(200).json({ token });
  }),
];

module.exports = { login };
