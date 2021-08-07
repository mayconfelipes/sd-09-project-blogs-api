const express = require('express');
const controller = require('../controller/userController');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/user/:id', controller.getUser);
router.get('/user', controller.getAllUsers);

router.post('/user', middleware.createUser, controller.createUsers);

module.exports = router;
