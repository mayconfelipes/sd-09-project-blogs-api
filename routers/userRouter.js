const express = require('express');
const userController = require('../controllers/userController');
const validateJWT = require('../middlewares/validateJWT');

const route = express.Router();

route.post('/user', userController.createUser);
route.get('/user',
validateJWT,
userController.getAll);

module.exports = route;