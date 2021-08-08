const express = require('express');
const users = require('../controllers/users');
const { token } = require('../services/users');

const route = express.Router();

route.post('/', users.create);
route.get('/', token, users.getAll);

module.exports = route;