const loginServices = require('../services/loginServices');

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginServices.loginUser({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
};
