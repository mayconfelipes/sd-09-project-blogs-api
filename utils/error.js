const erro = {
  ERROR_EMAIL_AE: {
    status: 409,
    message: 'User already registered',
  },
  INVALID_FIELDS: {
    status: 400,
    message: 'Invalid fields',
  },
  NONEXISTENT_USER: {
    status: 404,
    message: 'User does not exist',
  },
  CATEGORY_NOT_FOUND: {
    status: 400,
    message: '"categoryIds" not found',
  },
  POST_NOT_FOUND: {
    status: 404,
    message: 'Post does not exist',
  },
};

module.exports = erro;