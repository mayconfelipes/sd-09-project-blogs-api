const messages = {
  USER_ALREADY_EXISTS: 'User already registered',
  INVALID_FIELDS: 'Invalid fields',
  TOKEN_NOT_FOUND: 'Token not found',
  INVALID_TOKEN: 'Expired or invalid token',
  USER_NOT_EXIST: 'User does not exist',
  POST_NOT_EXIST: 'Post does not exist',
  CATEGORY_NOT_FOUND: '"categoryIds" not found',
  CATEGORY_CANNOT_EDITED: 'Categories cannot be edited',
  UNAUTHORIZED_USER: 'Unauthorized user',
  UNEXPECTED_ERROR: 'Something unexpected happened. try again.',
};

const codes = {
  CODE_400: 400,
  CODE_200: 200,
  CODE_201: 201,
  CODE_409: 409,
  CODE_401: 401,
  CODE_404: 404,
  CODE_204: 204,
  CODE_500: 500,
};

const objectError = (message, code) => ({ response: { message }, code });

const objectResponse = (response, code) => ({ response, code });

module.exports = { messages, codes, objectError, objectResponse };