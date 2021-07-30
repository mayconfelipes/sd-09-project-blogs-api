const { Router } = require('express');
const { createUser, getAllUsers } = require('../controllers/usersController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const UserRoute = Router();

UserRoute.route('/user')
  .post(createUser)
  .get(tokenMiddleware, getAllUsers);

module.exports = UserRoute;