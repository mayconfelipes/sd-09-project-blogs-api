const express = require('express');
const users = require('../controllers/users');
const schemas = require('../middlewares/schemas');

const route = express.Router();

route.post('/', schemas.userSchema, users.create);

module.exports = route;