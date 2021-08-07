const { User } = require('../models');

const createUser = async (userFields) => {
    const { displayName, email, password, image } = userFields;
    const user = await User.create({ displayName, email, password, image });
    return user;
};

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    return user;
};

module.exports = { createUser, getAllUsers, getUserById };
