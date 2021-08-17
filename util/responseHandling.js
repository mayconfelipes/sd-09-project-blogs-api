const messages = {
  USER_ALREADY_EXISTS: 'User already registered',
};

const codes = {
  CODE_400: 400,
  CODE_200: 200,
};

const objectError = (message, code) => ({ response: { message }, code });

const objectResponse = (response, code) => ({ response, code });

module.exports = { messages, codes, objectError, objectResponse };