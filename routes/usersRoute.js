const express = require('express');
const rescue = require('express-rescue');
const validateToken = require('../middlewares/validateToken');
const { validateForm } = require('../middlewares/validateForm');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/user', validateForm, rescue(usersController.createUser));
router.get('/user', validateToken, rescue(usersController.getUsersAll));
router.get('/user/:id', validateToken, rescue(usersController.getUserById));
router.delete('/user/me', validateToken, rescue(usersController.deleteUser));

module.exports = router;
