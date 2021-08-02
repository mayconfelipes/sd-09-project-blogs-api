const { checkSchema } = require('express-validator');

module.exports = {
  signupFields: checkSchema({
    email: {
      notEmpty: true,
      errorMessage: {
        message: '"email" is required',
        code: 400,
      },
    },
    password: {
      notEmpty: true,
      errorMessage: {
        message: '"password" is required',
        code: 400,
      },
    },
  }), 
  validFields: checkSchema({
    displayName: {
      trim: true,
      notEmpty: true,
      isLength: {
        options: { min: 8 },
      },
      errorMessage: {
        message: '"displayName" length must be at least 8 characters long',
        code: 400,
      },
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: {
        message: '"email" must be a valid email',
        code: 400,
      },
    },
    password: {
      isLength: {
        options: { min: 6 },
      },
      errorMessage: {
        message: '"password" length must be 6 characters long',
        code: 400,
      },
    },
  }),
  loginEmailEmpty: checkSchema({
    email: {
      isLength: {
        options: { min: 1 },
      },
      errorMessage: {
        message: '"email" is not allowed to be empty',
        code: 400,
      },
    },
  }),
  loginPasswordEmpty: checkSchema({
    password: {
      isLength: {
        options: { min: 1 },
      },
      errorMessage: {
        message: '"password" is not allowed to be empty',
        code: 400,
      },
    },
  }),
  loginFields: checkSchema({
    password: {
      exists: true,
      errorMessage: {
        message: '"password" is required',
        code: 400,
      },
    },
    email: {
      exists: true,
      errorMessage: {
        message: '"email" is required',
        code: 400,
      },
    },
  }),
};
