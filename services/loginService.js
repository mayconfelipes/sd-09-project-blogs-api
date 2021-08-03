const validateLogin = require('../middlewares/validateLogin');
const validateEmailService = require('./userService');

const loginUser = async (bodyReq) => {
  const emailExist = await validateEmailService.validateEmail(bodyReq.email);
  const validate = await validateLogin(bodyReq);

  if (!validate.message && emailExist) {
    return bodyReq;
  }
  if (!validate.message && !emailExist) {
    return { message: 'Invalid fields' };
  }
  return validate;
};
module.exports = {
  loginUser,
};
