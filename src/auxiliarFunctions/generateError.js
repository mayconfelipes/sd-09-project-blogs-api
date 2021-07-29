const statusCodes = {
  badRequest: 400,
  conflict: 409,
};

const generateError = (statusCode, message) => ({ code: statusCodes[statusCode], message });

module.exports = generateError;