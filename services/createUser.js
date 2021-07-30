const { User } = require('../models');
const { createToken } = require('../utils/createToken');

const createUserService = async (displayName, email, password, image) => {
    await User.create({ displayName, email, password, image });
    
    const token = createToken({ displayName, email, password, image });
    return token;
};

module.exports = {
    createUserService,
};
