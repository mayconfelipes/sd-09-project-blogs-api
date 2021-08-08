const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const userController = require('../controllers/userController');
const validateUserFields = require('../middlewares/validateUserFields');

const userRouter = express.Router();

userRouter.post('/', validateUserFields, rescue(userController.createUser));
// userRouter.get('/', rescue(userController.getAllUsers));
// userRouter.post('/:id', rescue(userController.getUserById));

module.exports = userRouter;