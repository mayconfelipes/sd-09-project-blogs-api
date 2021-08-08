const express = require('express');
const users = require('../controllers/users');
const { token } = require('../services/users');

const route = express.Router();

route.post('/', users.create);
route.get('/', token, users.getAll);
route.get('/:id', token, users.getById);

module.exports = route;