const express = require('express');
const UserService = require('../services/UsersServices');
const { HTTP_CREATED_STATUS } = require('../helpers/statusProtocoloHTTP');
const { validateDataUser, userExists } = require('../middlewares/validateUser');

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

module.exports = userRoute;