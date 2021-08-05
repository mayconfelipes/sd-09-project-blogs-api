const express = require('express');
const rescue = require('express-rescue');
const { validateForm } = require('../middlewares/validateForm');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/user', validateForm, rescue(usersController.createUser));
router.get('/user', rescue(usersController.getUsersAll));

module.exports = router; 