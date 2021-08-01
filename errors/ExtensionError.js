class ExtensionError extends Error {
  constructor(message) {
    super();
    this.name = 'ExtensionError';
    this.http = 403;
    this.message = message;
  }
}

module.exports = ExtensionError;
