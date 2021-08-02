const express = require('express');
const userControllers = require('../controllers/userController');
const middValidate = require('../middlewares/validateToken');

const userRoutes = express.Router();

userRoutes.post('/', userControllers.validateFields, userControllers.addUser);

userRoutes.get('/', middValidate.validateToken, userControllers.listUser);

module.exports = userRoutes;
