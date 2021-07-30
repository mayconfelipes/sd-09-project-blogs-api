const express = require('express');
const loginController = require('../controllers/login');

const route = express.Router();

route.post('/', loginController.logUser);

module.exports = route;