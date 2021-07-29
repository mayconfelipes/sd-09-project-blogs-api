const rescue = require('express-rescue');
 const jwt = require('jsonwebtoken');
const LoginVerify = require('../services/utils/loginSchema');
const LoginService = require('../services/Login');

const login = rescue(async (req, res, next) => {
    const { error } = LoginVerify.validate(req.body);
    if (error) { return next(error); }
    const { email, password } = await LoginService.login({ ...req.body });

    const payload = { email, password };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  
        res.status(200).json({ token });
});
module.exports = { login };