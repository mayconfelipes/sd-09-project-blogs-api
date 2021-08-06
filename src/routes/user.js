const express = require('express');
const user = require('../controllers/user');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.user, validate.userExists, user.create);
route.use(validate.token);
route.get('/', user.findAll);
route.get('/:id', user.findOne);
route.delete('/me', user.destroy);

module.exports = route;
