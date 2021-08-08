const loginServices = require('../services/loginServices');

async function login(req, res) {
  const { email, password } = req.body;
  const { status, response } = await loginServices.login(email, password);
  return res.status(status).json(response);
}

module.exports = {
  login,
};
