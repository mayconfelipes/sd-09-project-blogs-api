const { isUserValid } = require('../services/loginValidation');
const { generateToken } = require('../services/token');

const newLogin = async (req, res, _next) => {
  const loginData = req.body;

  const invalidLogin = await isUserValid(loginData);
  if (invalidLogin) return res.status(invalidLogin.status).json({ message: invalidLogin.message });

  const { password: _, ...noPassword } = loginData;
  const token = generateToken(noPassword);

  return res.status(200).json({ token });
};

module.exports = {
  newLogin,
};