const express = require('express');
const bodyParser = require('body-parser');

const route = express.Router();
route.use(bodyParser.json());

const controllers = require('../controllers');

route.get('/', controllers.listAllUsers); // list users
route.get('/:id', controllers.findUserById); // find user by id
route.post('/', controllers.createUser);
// route.post('/', ); // create user
// route.put('/', );// edit user
// route.delete('/'); // delete user

module.exports = route;