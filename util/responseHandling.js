const messages = {
  USER_ALREADY_EXISTS: 'User already registered',
  INVALID_FIELDS: 'Invalid fields',
};

const codes = {
  CODE_400: 400,
  CODE_200: 200,
  CODE_201: 201,
  CODE_409: 409,
};

const objectError = (message, code) => ({ response: { message }, code });

const objectResponse = (response, code) => ({ response, code });

module.exports = { messages, codes, objectError, objectResponse };