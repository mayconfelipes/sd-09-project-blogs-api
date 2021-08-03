const LoginService = require('../../services/LoginService');

module.exports = async (req, res) => {
  const { body } = req;
  const result = await LoginService(body);

  res.status(200).json({ token: result });
};
