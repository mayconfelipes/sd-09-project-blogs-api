const loginServices = require('../services/loginServices');

const login = (req, res) => loginServices.login(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

module.exports = { login };
