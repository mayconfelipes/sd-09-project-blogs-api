const { Router } = require('express');

const { createToken } = require('../middlewares/token');
const { getUserByEmail } = require('../services/login');
const { validateLogin } = require('../middlewares/login');

const OK_STATUS = 200;
const BAD_REQUEST_STATUS = 400;

const loginController = new Router();

loginController.post('/', validateLogin, async (req, res, _next) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    const message = 'Invalid fields';
    return res.status(BAD_REQUEST_STATUS).json({ message });
  }

  const token = createToken(email);
  return res.status(OK_STATUS).json({ token });
});

module.exports = loginController;
