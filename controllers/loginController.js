const express = require('express');

const router = express.Router();
const { validateLogin, createToken } = require('../middlewares');
const userServices = require('../services/UserService');

const ok = 200;

router.post('/', validateLogin, createToken, async (req, res, _next) => {
    const user = await userServices.login(req.body);
    console.log(user);
    if (!user) return res.status(400).json({ message: 'Invalid fields' });

    const { token } = req;

    res.status(ok).json({ token });
});

module.exports = router;