const { checkSchema } = require('express-validator');

module.exports = {
  createCategory: checkSchema({
    name: {
      notEmpty: true,
      errorMessage: {
        message: '"name" is required',
        code: 400,
      },
    },
  }),
};
