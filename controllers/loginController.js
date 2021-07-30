const validations = require('../validations');
const { loginService } = require('../services');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const validateLogin = await loginService.validateLogin(email, password);

  return validateLogin.error
    ? next(validateLogin)
    : res.status(200).json({ token: validations.generateToken(req.body) });
};
