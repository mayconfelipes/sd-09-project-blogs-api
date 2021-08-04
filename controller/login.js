const service = require('../services/login');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await service.login({ email, password });
  if (response.error) return next(response.error);

  return res.status(200).json({ token: response.token });
};

module.exports = {
  login,
};
