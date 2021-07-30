const {
  loginService,
} = require('../services/loginService');

const loginController = async (req, res, next) => {
  const { body: { email, password } } = req;
  const result = await loginService({ email, password });
  if (!result.token) {
    return next(result);
  }
  return res.status(200).json(result);
};

module.exports = {
  loginController,
};
