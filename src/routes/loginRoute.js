const { Router } = require('express');
const { loginUser } = require('../controllers/loginController');

const LoginRoute = Router();

LoginRoute.route('/login')
  .post(loginUser);

module.exports = LoginRoute;