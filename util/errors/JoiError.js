const StatusCode = require('../statusCode');

module.exports = class JoiError extends Error {
  constructor(msg) {
    super(msg);
    this.code = StatusCode.badRequest;
  }
};