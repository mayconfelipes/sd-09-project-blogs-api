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

module.exports = {
  createUser,
};
