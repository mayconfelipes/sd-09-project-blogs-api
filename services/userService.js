const { User } = require('../models');

const createUserService = async (displayName, email, password, image) => {
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
};

const findAllUsers = async () => {
    const allUsers = await User.findAll();
    
    return allUsers;
};

module.exports = {
    createUserService,
    findAllUsers,
};
