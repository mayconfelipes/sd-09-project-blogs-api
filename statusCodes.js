const statusCodes = {
  userExist: 409,
  displayNameInvalid: 400,
  emailNull: 400,
  emailInvalid: 400,
  passwordNull: 400,
  passwordInvalid: 400,
  emailRequired: 400,
  emailIsEmpty: 400,
  passwordRequired: 400,
  passwordIsEmpty: 400,
  userInvalid: 400,
  jwtNotFound: 401,
  jwtInvalid: 401,
  userNotFind: 404,
  NameRequired: 400,
};

module.exports = statusCodes;