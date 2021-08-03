const rescue = require('express-rescue');
const Login = require('../services/Login');

const log = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const response = await Login.log(email, password);

  if (response.err) {
    return next({
      error: {
        message: response.err.message,
        statusCode: 400,
      },
    });
  }

  return res.status(200).json({ token: response.token });
});

module.exports = {
  log,
};
