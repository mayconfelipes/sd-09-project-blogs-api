const { Router } = require('express');

const { createUser, getUserByEmail } = require('../services/users');
const { createToken } = require('../middlewares/token');
const { validateUser } = require('../middlewares/users');

const CREATED_STATUS = 201;
const CONFLICT_STATUS = 409;

const usersControllers = new Router();

usersControllers.post('/', validateUser, async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  const user = await getUserByEmail(email);

  if (user) {
    const message = 'User already registered';
    return res.status(CONFLICT_STATUS).json({ message });
  }

  await createUser(displayName, email, password, image);
  const token = createToken(email);
  return res.status(CREATED_STATUS).json({ token });
});

module.exports = usersControllers;
