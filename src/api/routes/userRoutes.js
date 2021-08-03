const express = require('express');

const User = require('../../controllers/User');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateToken,
} = require('../../middlewares');

const router = express.Router();

router.post('/', [
  validateDisplayName,
  validateEmail,
  validatePassword,
  User.create,
]);

router.get('/', [validateToken, User.findAll]);
router.get('/:id', [validateToken, User.findByPk]);

module.exports = router;
