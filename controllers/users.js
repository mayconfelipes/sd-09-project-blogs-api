const rescue = require('express-rescue');
const { usersService } = require('../services');

const { code: { CONFLICT, CREATED, BAD_REQUEST, OK } } = require('../utils');

const create = rescue(async (req, res) => {
  const { token, email } = req;
  if (email) {
    return res.status(CONFLICT).json({ message: 'User already registered' });
  }

  await usersService.createUser(req.body);
  return res.status(CREATED).json({ token });
});

const login = rescue(async (req, res) => {
  const { token, email } = req;
  if (!email) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  await usersService.login(req.body);
  return res.status(OK).json({ token });
});

module.exports = {
  create,
  login,
};
