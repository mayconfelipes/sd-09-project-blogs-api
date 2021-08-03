const StatusCode = require('../statusCode');

module.exports = class InvalidCredentials extends Error {
  constructor() {
    super('Invalid fields');
    this.code = StatusCode.badRequest;
  }
};