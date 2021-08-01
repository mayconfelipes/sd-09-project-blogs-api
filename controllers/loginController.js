const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  try {
    const token = await loginService.login(req.body);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
