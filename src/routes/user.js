const express = require('express');
const user = require('../controllers/user');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.user, validate.userExists, user.create);

module.exports = route;
