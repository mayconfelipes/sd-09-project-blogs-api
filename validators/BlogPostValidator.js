const { checkSchema } = require('express-validator');

module.exports = {
  createPost: checkSchema({
    title: {
      notEmpty: true,
      errorMessage: {
        message: '"title" is required',
        code: 400,
      },
    },
    content: {
      notEmpty: true,
      errorMessage: {
        message: '"content" is required',
        code: 400,
      },
    },
    categoryIds: {
      notEmpty: true,
      errorMessage: {
        message: '"categoryIds" is required',
        code: 400,
      },
    },
  }),
};
