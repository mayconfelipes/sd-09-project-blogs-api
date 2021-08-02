const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const { User } = require('../models');

module.exports = rescue(async (req, res, next) => {
    const { error } = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    }).validate(req.body);

    if (error) return next(error);

    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email },
    });

    if (!user || user.password !== password) {
        return next({ message: 'Invalid fields', code: 400 });
    }

    const token = jwt.sign(user.dataValues, process.env.JWT_SECRET);

    res.status(200).json({ token });
}); 