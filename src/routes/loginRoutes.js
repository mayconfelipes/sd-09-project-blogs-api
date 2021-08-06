const express = require('express');
const loginController = require('../controllers/loginController');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.login, loginController.login);

module.exports = route;
