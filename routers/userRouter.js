const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const userController = require('../controllers/userController');
const validateUserFields = require('../middlewares/validateUserFields');
const validateToken = require('../middlewares/validateToken');

const userRouter = express.Router();

userRouter.post('/', validateUserFields, rescue(userController.createUser));
userRouter.get('/', validateToken, rescue(userController.getAllUsers));
userRouter.get('/:id', validateToken, rescue(userController.getUserById));
userRouter.delete('/me', validateToken, rescue(userController.deleteUser));

module.exports = userRouter;