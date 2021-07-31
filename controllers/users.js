const rescue = require('express-rescue');
const { usersService } = require('../services');

const { code: { CONFLICT, CREATED, BAD_REQUEST, OK },
  message: { CONFLICT_MESSAGE, BAD_REQUEST_MESSAGE } } = require('../utils');

const create = rescue(async (req, res) => {
  const { token, email } = req;
  if (email) {
    return res.status(CONFLICT).json({ message: CONFLICT_MESSAGE });
  }

  await usersService.createUser(req.body);
  return res.status(CREATED).json({ token });
});

const login = rescue(async (req, res) => {
  const { token, email } = req;
  if (!email) {
    return res.status(BAD_REQUEST).json({ message: BAD_REQUEST_MESSAGE });
  }

  await usersService.login(req.body);
  return res.status(OK).json({ token });
});

const getUsers = rescue(async (_req, res) => {
  const users = await usersService.getUsers();
  return res.status(OK).json(users);
});

module.exports = {
  create,
  login,
  getUsers,
};
