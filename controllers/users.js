const { Router } = require('express');

const usersServices = require('../services/users');
const { createToken, validateToken } = require('../middlewares/token');
const { validateUser } = require('../middlewares/users');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;

const usersControllers = new Router();

usersControllers.post('/', validateUser, async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  const user = await usersServices.getUserByEmail(email);
  if (user) {
    const message = 'User already registered';
    return res.status(CONFLICT_STATUS).json({ message });
  }
  await usersServices.createUser(displayName, email, password, image);
  const token = createToken(email);
  return res.status(CREATED_STATUS).json({ token });
});

usersControllers.get('/', validateToken, async (_req, res, _next) => {
  const users = await usersServices.getAllUsers();
  return res.status(OK_STATUS).json(users);
});

usersControllers.get('/:id', validateToken, async (req, res, _next) => {
  const { id } = req.params;
  const user = await usersServices.getUserById(id);
  if (!user) {
    const message = 'User does not exist';
    return res.status(NOT_FOUND_STATUS).json({ message });
  }
  return res.status(OK_STATUS).json(user);
});

module.exports = usersControllers;
