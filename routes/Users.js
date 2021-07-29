const express = require('express');
const UsersControllers = require('../controllers/Users');
const validate = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', UsersControllers.createUser);
router.get('/', validate.jwtValidate, UsersControllers.findAll);
router.get('/:id', validate.jwtValidate, UsersControllers.findById);
router.delete('/me', validate.jwtValidate, UsersControllers.deleteYourSelf);
module.exports = router;