class NotFoundError extends Error {
  /**
   *
   * @param {string} entity name of the entity that was not found
   */

  constructor(entity) {
    super();
    this.name = 'NotFoundError';
    this.http = 404;
    this.message = `${entity} does not exist`;
  }
}

module.exports = NotFoundError;