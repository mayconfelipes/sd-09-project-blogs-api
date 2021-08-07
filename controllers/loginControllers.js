const loginServices = require('../services/loginServices');

const okay = 200;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userInfos = { email, password };
  const response = await loginServices.loginUser(userInfos);
  const { error, status, message } = response;
  if (error) return res.status(status).json({ message });
  return res.status(okay).json(response);
};

module.exports = {
  loginUser,
};
