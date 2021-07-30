const { Router } = require('express');
const { createUser } = require('../controllers/usersController');

const UserRoute = Router();

UserRoute.route('/user')
  .post(createUser);

module.exports = UserRoute;