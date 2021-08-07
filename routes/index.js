const express = require('express');
const controller = require('../controller/userController');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/user/:id', controller.getUser);
router.get('/user', controller.getAllUsers);

router.post('/user', middleware.validUser, controller.createUsers);
router.post('/login', middleware.createToken, controller.login);

module.exports = router;
