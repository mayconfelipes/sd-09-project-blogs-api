const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const userController = require('../controllers/User');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;