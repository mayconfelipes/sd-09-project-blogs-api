const express = require('express');
const { authorizeLogin, generateToken } = require('../middlewares/auth');

const router = express.Router();
const { getUserByEmail } = require('../services/usersServices');

router.post('/', authorizeLogin, async (req, res) => {
  const user = await getUserByEmail(req.body.email);
  delete user.password;
  const token = generateToken(user);
  res.status(200).json({ token });
});

module.exports = router;