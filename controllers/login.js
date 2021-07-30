const loginService = require('../service/login');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService(email, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
