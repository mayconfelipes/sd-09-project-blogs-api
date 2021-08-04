const StatusCode = require('../statusCode');

module.exports = class CategoryIdNotFound extends Error {
  constructor() {
    super('"categoryIds" not found');
    this.code = StatusCode.badRequest;
  }
};