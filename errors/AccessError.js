class AccessError extends Error {
  /**
   *
   * @param {string} message message to be displayed as error description
   */
  constructor(message) {
    super();
    this.name = 'AccessError';
    this.http = 401;
    this.message = message;
  }
}

module.exports = AccessError;
