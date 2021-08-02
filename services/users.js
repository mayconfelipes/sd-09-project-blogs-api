const model = require('../models/user');
const response = require('../helpers/response');
const validateUser = require('../helpers/validateUser');
const userExists = require('../helpers/userExists');

const signIn = async (displayName, email, password, image) => {
  const userValidation = validateUser(displayName, password, email);
  if (userValidation.status !== 200) {
    return response(userValidation.status, userValidation.message);
  }

  const emailValidation = userExists(email);
  if (emailValidation.status !== 200) {
    return response(emailValidation.status, emailValidation.message);
  }

  const { status, user } = await model.users.signIn(displayName, email, password, image);

  return {
    status,
    user,
  };
};

module.exports = {
  signIn,
};