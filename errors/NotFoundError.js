class NotFoundError extends Error {
  constructor(entity) {
    super();
    this.name = 'NotFoundError';
    this.http = 404;
    this.message = `${entity} not found`;
  }
}

module.exports = NotFoundError;