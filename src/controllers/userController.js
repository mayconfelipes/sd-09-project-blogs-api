const userService = require('../services/userServices');

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
};

module.exports = { createUser };
