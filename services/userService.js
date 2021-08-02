const { User } = require('../models');

const createUserService = async (displayName, email, password, image) => {
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
};

const findAllUsers = async () => {
    const allUsers = await User.findAll();
    
    return allUsers;
};

const findById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return { error: 'User does not exist' };

    return user;
};

module.exports = {
    createUserService,
    findAllUsers,
    findById,
};
