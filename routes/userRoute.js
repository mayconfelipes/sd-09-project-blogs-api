const express = require('express');

const router = express.Router();

const useController = require('../controller/userController');

router.post('/', useController.addUserController);

router.get('/', useController.getUsers);

module.exports = router;
