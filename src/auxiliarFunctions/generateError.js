const statusCodes = {
  notFound: 404,
  conflict: 409,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
};

const generateError = (statusCode, message) => ({ code: statusCodes[statusCode], message });

module.exports = generateError;

// Testando um gerador de erro proposto por Layo Kaminski