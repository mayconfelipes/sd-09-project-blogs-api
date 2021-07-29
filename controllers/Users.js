const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const UserService = require('../services/Users');
const UserVerify = require('../services/utils/userSchema');

const createUser = rescue(async (req, res, next) => {
    const { error } = UserVerify.validate(req.body);
    if (error) { next(error); }
    const { email, password } = await UserService.createUser({ ...req.body });
    
    const payload = { email, password };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
});

const findAll = rescue(async (req, res) => {
    const allUsers = await UserService.findAll();
    res.status(200).json(allUsers);
});

const findById = rescue(async (req, res) => {
    const { id } = req.params;
    const idUsers = await UserService.findById(id);
    res.status(200).json(idUsers);
});

const deleteYourSelf = rescue(async (req, res) => {
    await UserService.deleteYourSelf(req.user);
    res.status(204).json([]);
});

module.exports = { createUser, findAll, findById, deleteYourSelf };