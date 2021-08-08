require('dotenv');
const rescue = require('express-rescue');
const JWT = require('../Auth/createJWT');
const LoginService = require('../Services/loginService');

module.exports = rescue(async (req, res, _next) => {
  await LoginService(req.body);
  const token = JWT(req.body);
  res.status(200).json({ token });
});
