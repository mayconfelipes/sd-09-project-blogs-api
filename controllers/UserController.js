const express = require('express');

const router = express.Router();
const userService = require('../services/UserService');
const { validateUser, createToken, checkEmailExists, validateToken } = require('../middlewares');

const statusSucessCreate = 201;
const ok = 200;

router.post('/', validateUser, checkEmailExists, createToken, async (req, res, _next) => {
    await userService.create(req.body);

    const { token } = req;
    res.status(statusSucessCreate).json({ token });
});

router.get('/', validateToken, async (_req, res, _next) => {
    const users = await userService.getAll();
  
    return res.status(ok).json(users);
  });

module.exports = router;