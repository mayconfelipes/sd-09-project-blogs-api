const express = require('express');

const router = express.Router();
const userService = require('../services/UserService');
const { validateUser, createToken, checkEmailExists } = require('../middlewares');

const statusSucessCreate = 201;

router.post('/', validateUser, checkEmailExists, createToken, async (req, res, _next) => {
    await userService.create(req.body);

    const { token } = req;
    res.status(statusSucessCreate).json({ token });
});

module.exports = router;