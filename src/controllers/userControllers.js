const userService = require('../services/userServices');

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
};

const getAllUsers = async (_req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
};

module.exports = { createUser, getAllUsers, getUserById };
