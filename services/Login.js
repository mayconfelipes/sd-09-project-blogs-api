const boom = require('@hapi/boom');
const { User } = require('../models');

const login = async ({ email, password }) => {
        const loginUser = await User.findOne({ where: { email } });
         if (!loginUser || loginUser.password !== password) {
            throw boom.badRequest('Invalid fields');
         }
        return loginUser;
};
module.exports = { login };