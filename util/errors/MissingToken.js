const StatusCode = require('../statusCode');

module.exports = class MissingToken extends Error {
  constructor() {
    super('Token not found');
    this.code = StatusCode.unauthorized;
  }
};