const statusCodes = {
  badRequest: 400,
  conflict: 409,
  unauthorized: 401,
};

const generateError = (statusCode, message) => ({ code: statusCodes[statusCode], message });

module.exports = generateError;