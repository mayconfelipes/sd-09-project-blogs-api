const messages = {
  USER_ALREADY_EXISTS: 'User already registered',
  INVALID_FIELDS: 'Invalid fields',
  TOKEN_NOT_FOUND: 'Token not found',
  INVALID_TOKEN: 'Expired or invalid token',
  USER_NOT_EXIST: 'User does not exist',
};

const codes = {
  CODE_400: 400,
  CODE_200: 200,
  CODE_201: 201,
  CODE_409: 409,
  CODE_401: 401,
  CODE_404: 404,
};

const objectError = (message, code) => ({ response: { message }, code });

const objectResponse = (response, code) => ({ response, code });

module.exports = { messages, codes, objectError, objectResponse };