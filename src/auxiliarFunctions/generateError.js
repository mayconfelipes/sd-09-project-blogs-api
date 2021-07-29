const statusCodes = {
  notFound: 404,
  conflict: 409,
  badRequest: 400,
  unauthorized: 401,
};

const generateError = (statusCode, message) => ({ code: statusCodes[statusCode], message });

module.exports = generateError;