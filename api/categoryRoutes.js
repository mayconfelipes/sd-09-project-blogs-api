const express = require('express');
const bodyParser = require('body-parser');

const route = express.Router();
route.use(bodyParser.json());

const controllers = require('../controllers');
const { authJwt } = require('../middlewares');

route.post('/', authJwt, controllers.createCategory);
// route.post('/', ); // create user
// route.put('/', );// edit user
// route.delete('/'); // delete user

module.exports = route;