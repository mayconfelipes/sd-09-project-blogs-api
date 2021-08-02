const router = require('express').Router();
const UserController = require('../controllers/UserController');
const UserValidator = require('../validators/UserValidator');

router.post(
  '/user',
  UserValidator.signupFields,
  UserValidator.validFields,
  UserController.addUser,
);
router.post(
  '/login',
  UserValidator.loginFields,
  UserValidator.loginEmailEmpty,
  UserValidator.loginPasswordEmpty,
  UserController.login,
);
router.get('/user', UserController.listAll);
router.get('/user/:id', UserController.listOne);

module.exports = router;
