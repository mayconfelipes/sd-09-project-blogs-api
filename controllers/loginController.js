const express = require('express');

const router = express.Router();
const { validateLogin } = require('../middlewares');
const userServices = require('../services/UserService');

const ok = 200;

router.post('/', validateLogin, async (req, res, _next) => {
    const token = await userServices.login(req.body);
    if (token === null) return res.status(400).json({ message: 'Invalid fields' });

    res.status(ok).json({ token });
});

module.exports = router;