const { Users } = require('../models');
const validationUser = require('../middlewares/validationUser');

const getAll = async () => {
    const users = await Users.findAll();
    return users;
};

const findByEmail = async (email) => {
    if (email) {
        const user = await Users.findOne({
            where: { email },
        });
        return user;
    } return null;
};

const addUser = async (body) => {
    const validate = await validationUser(body);
    const emailExist = await findByEmail(body.email);
    if (validate.error === undefined && !emailExist === true) {
        const user = await Users.create(body);
        return user;
    } if (emailExist) {
        return { message: 'User already registered' };
    }
    return { message: validate.error };
};

module.exports = { getAll, findByEmail, addUser };
