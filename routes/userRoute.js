const express = require('express');

const router = express.Router();

const userController = require('../controller/userController');

router.post('/', userController.addUserController);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

module.exports = router;
