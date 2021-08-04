const StatusCode = require('../statusCode');

module.exports = class InvalidToken extends Error {
  constructor() {
    super('Expired or invalid token');
    this.code = StatusCode.unauthorized;
  }
};