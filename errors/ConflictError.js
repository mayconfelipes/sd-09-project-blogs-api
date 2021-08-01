class ConflictError extends Error {
  /**
   *
   * @param {string} entity string relative to the entity name that is already registered in the database
   */

  constructor(entity) {
    super();
    this.name = 'ConflictError';
    this.http = 409;
    this.message = `${entity} already registered`;
  }
}

module.exports = ConflictError;
