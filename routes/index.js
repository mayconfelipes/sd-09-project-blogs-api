const express = require('express');
const controllerUser = require('../controller/userController');
const controllerCategory = require('../controller/controllerCategory');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/user/:id', controllerUser.getUser);
router.get('/user', controllerUser.getAllUsers);
router.get('/categories', controllerCategory.getAllCategories);

router.post('/user', middleware.validUser, controllerUser.createUsers);
router.post('/login', middleware.createToken, controllerUser.login);
router.post('/categories', middleware.nameCategory, controllerCategory.createCategory);

module.exports = router;
