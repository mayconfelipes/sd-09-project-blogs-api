const StatusCode = require('../statusCode');

module.exports = class EmailAlreadyExist extends Error {
  constructor() {
    super('User already registered');
    this.code = StatusCode.conflict;
  }
};