const StatusCode = require('../statusCode');

module.exports = class ContentNotFound extends Error {
  constructor(content) {
    super(`${content} does not exist`);
    this.code = StatusCode.notFound;
  }
};