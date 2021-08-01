class PermissionError extends Error {
  constructor(message) {
    super();
    this.name = 'PermissionError';
    this.http = 403;
    this.message = message;
  }
}

module.exports = PermissionError;
