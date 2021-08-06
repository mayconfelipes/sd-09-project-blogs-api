const express = require('express');
const users = require('../controllers/users');
// const schemas = require('../middlewares/schemas');

const route = express.Router();

route.post('/', users.create);

module.exports = route;