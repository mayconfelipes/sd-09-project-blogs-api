const { Users } = require('../models');
const validateUsers = require('../middlewares/validateUsers');

const validateEmail = async (email) => {
  if (email) {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    return user;
  }
};

const createUser = async (bodyReq) => {
  const validate = await validateUsers(bodyReq);
  const emailExist = await validateEmail(bodyReq.email);

  if (!validate.message && !emailExist) {
    const result = await Users.create(validate);
    return result;
  }
  if (emailExist) {
    return {
      message: 'User already registered',
    };
  }
  return validate;
};

const getAll = async () => {
  const result = await Users.findAll();
  return result;
};

const getById = async (id) => {
  if (id) {
    const user = await Users.findOne({
      where: {
        id,
      },
    });
    return user;
  }
};

module.exports = {
  createUser,
  validateEmail,
  getAll,
  getById,
};
