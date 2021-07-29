const Login = require('../services/Login');

const STATUS_OK = 200;

const login = async (req, res) => {
  const loginInfo = req.body;
  const token = await Login.login(loginInfo);

  return res.status(STATUS_OK).json({ token });
};

module.exports = login;
