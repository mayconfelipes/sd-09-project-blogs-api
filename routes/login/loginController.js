const loginService = require('./loginService');

const HTTP_STATUS_OK = 200;

const login = async (req, res, _next) => {
  const user = req.body;
  const result = await loginService.login(user);
  res.status(HTTP_STATUS_OK).json(result);
};

module.exports = {
  login,
};
