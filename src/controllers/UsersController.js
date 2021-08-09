const express = require('express');
const UserService = require('../services/UsersServices');
const { HTTP_CREATED_STATUS, HTTP_OK_STATUS } = require('../helpers/statusProtocoloHTTP');
const { validateDataUser, userExists, userIdExists } = require('../middlewares/validateUser');
const { validateToken } = require('../middlewares/validateToken');

const userRoute = express.Router();

userRoute.post('/', validateDataUser, userExists,
 async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
try {
  const token = await UserService.createUser(displayName, email, password, image);
  return res.status(HTTP_CREATED_STATUS).json({ token });
} catch (error) {
  return next(error);
}
});

userRoute.get('/', validateToken, async (_req, res, next) => {
  try {
    const listUsers = await UserService.getUsersAll();
    return res.status(HTTP_OK_STATUS).json(listUsers);
  } catch (error) {
    return next(error);
  }
});

userRoute.get('/:id', validateToken, userIdExists, async (req, res, next) => {
  const { user } = req;
  try {
    return res.status(HTTP_OK_STATUS).json(user);
  } catch (error) {
    return next(error);
  }
});

module.exports = userRoute;