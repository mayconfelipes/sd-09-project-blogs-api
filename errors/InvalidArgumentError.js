class InvalidArgumentError extends Error {
  /**
   *
   * @param {string} message message to be displayed as error description
   */

  constructor(message) {
    super();
    this.name = 'InvalidArgumentError';
    this.http = 400;
    this.message = message;
  }
}

module.exports = InvalidArgumentError;
