const { Router } = require('express');
const { createUser, getAllUsers, getUserById } = require('../controllers/usersController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const UserRoute = Router();

UserRoute.route('/user')
  .post(createUser)
  .get(tokenMiddleware, getAllUsers);
UserRoute.route('/user/:id').get(tokenMiddleware, getUserById);

module.exports = UserRoute;